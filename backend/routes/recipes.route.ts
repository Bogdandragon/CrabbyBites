import { Router } from "express";
import User from "../models/users.model";
import Recipe from "../models/recipes.model";
import bcrypt from "bcrypt";
import validators from "../common/validators";
import adminMiddleware from "../middlewares/adminMiddleware";

const router = Router();

router.get("/all-recipes", adminMiddleware, async (req, res) => {
	
	// check if user is logged in
	// check if user is admin
	// return all recipes not made by admin

	let recipes = await Recipe.find();

	for (let i = 0; i < recipes.length; i++) {
		let user = await User.findById(recipes[i].userId);
		if (user?.type == "ADMIN") {
			recipes.splice(i, 1);
		}
	}
	res.send(recipes);
});


export default router;