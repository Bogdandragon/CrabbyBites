import { Router } from "express";
import User from "../models/users.model";
import Recipe from "../models/recipes.model";
import bcrypt from "bcrypt";
import validators from "../common/validators";

const router = Router();

router.get("/all-recipes", async (req, res) => {
	
	// check if user is logged in
	// check if user is admin
	// return all recipes
	let recipes = await Recipe.find();
	res.send(recipes);
});


export default router;