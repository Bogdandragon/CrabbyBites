import { Router } from "express";
import User from "../models/users.model";
import Recipe from "../models/recipe.model";
import bcrypt from "bcrypt";
import validators from "../common/validators";
import adminMiddleware from "../middlewares/adminMiddleware";

const router = Router();

const reportThreshold = 2;
const pending = "PENDING";

router.get("/review", adminMiddleware, async (req, res) => {
	// send recipes with status "PENDING" or reportNo >= reportThreshold
	const recipes = await Recipe.find({ $or: [{ status: pending }, { reportNo: { $gte: reportThreshold } }] });
	
	res.send(recipes);
});


export default router;