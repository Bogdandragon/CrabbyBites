import { Router } from "express";
import User from "../models/users.model";
import Recipe from "../models/recipe.model";
import bcrypt from "bcrypt";
import validators from "../common/validators";
import adminMiddleware from "../middlewares/adminMiddleware";

const router = Router();

const reportThreshold = 2;

router.get("/review", adminMiddleware, async (req, res) => {
	// send recipes with status "PENDING" or reportNo >= reportThreshold
	const recipes = await Recipe.find({ $or: [{ status: "PENDING" }, { reportNo: { $gte: reportThreshold } }] });
	
	return res.send(recipes);
});


export default router;