import { Router } from "express";
import User from "../models/users.model";
import Recipe from "../models/recipes.model";
import bcrypt from "bcrypt";
import validators from "../common/validators";
import adminMiddleware from "../middlewares/adminMiddleware";

const router = Router();

const reportThreshold = 2;
const pending = "PENDING";

router.get("/review", adminMiddleware, async (req, res) => {
	
	let recipes = await Recipe.find({ status: pending, reportNo: { $gte: reportThreshold } });
	res.send(recipes);
});


export default router;