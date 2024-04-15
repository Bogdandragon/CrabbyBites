import { Router } from "express";
import User from "../models/users.model";
import Recipe from "../models/recipe.model";
import bcrypt from "bcrypt";
import validators from "../common/validators";
import adminMiddleware from "../middlewares/adminMiddleware";
import userMiddleware from "../middlewares/userMiddleware";

const router = Router();

const reportThreshold = 2;

router.get("/review", adminMiddleware, async (req, res) => {
	// send recipes with status "PENDING" or reportNo >= reportThreshold
	const recipes = await Recipe.find({ $or: [{ status: "PENDING" }, { reportNo: { $gte: reportThreshold } }] });
	
	return res.send(recipes);
});

router.delete("/remove/:id", userMiddleware, async (req: any, res) => {
	// delete recipe with given id if it belongs to the requesting user
	const { id } = req.params;
	let recipe = await Recipe.findById(id);
	if (!recipe) {
		return res.status(404).send("Recipe not found");
	}
	
	const userId = req.user._id;
	if (!recipe.userId.equals(userId)) {
		return res.status(400).send("Unauthorized action");
	}

	await Recipe.findByIdAndDelete(id);
	return res.status(200).send("Recipe deleted successfully");
});



export default router;