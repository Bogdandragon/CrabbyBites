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
	
	// check if user is logged in
	// check if user is admin
	// return all recipes not made by admin

	let recipes = await Recipe.find();
	let recipesToSend = [];

	for (let i = 0; i < recipes.length; i++) {
		let user = await User.findById(recipes[i].userId);
		if (!user) {
			res.status(404).send("User not found");
			return;
		}
		if (recipes[i].status != pending || recipes[i].reportNo < reportThreshold) {
			continue;
		}
		recipesToSend.push(recipes[i]);
	}
	res.send(recipesToSend);
});


export default router;