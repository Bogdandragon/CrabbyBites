import { Router } from "express";
import User from "../models/users.model";
import Recipe from "../models/recipe.model";
import bcrypt from "bcrypt";
import validators from "../common/validators";
import adminMiddleware from "../middlewares/adminMiddleware";
import userMiddleware from "../middlewares/userMiddleware";
import Ingredient from "../models/ingredient.model";
import { error } from "console";

const router = Router();

const reportThreshold = 2;

router.get("/review", adminMiddleware, async (req, res) => {
	// send recipes with status "PENDING" or reportNo >= reportThreshold
	const recipes = await Recipe.find({ $or: [{ status: "PENDING" }, { reportNo: { $gte: reportThreshold } }] });
	
	return res.send(recipes);
});


router.post("/addRecipe", async (req, res) => {
	let validate = validators.addRecipe.validate(req.body);
	if (validate.error) {
		return res.status(400).send(validate.error.message);
	}

	// check if user exists
	const user = await User.findById(req
		.body.userId);
	if (!user) {
		return res.status(404).send("User not found");
	}

	const { name, time, difficulty, portions, picture, encoding, category, description, ingredients, instructions, userId } = req.body

	const recipe = new Recipe({
		name, time, difficulty, portions, picture, category, description, ingredients, instructions, userId
	});

	// search for new or existing ingredients
	for (let i = 0; i < ingredients.length; i++) {
		const ingredient = ingredients[i];

		const existingIngredient = await Ingredient.findOne({ name: ingredient.name.toLowerCase() });
		if (existingIngredient) {
			existingIngredient.appearanceNo++;
			await existingIngredient.save();
		} else {
			const newIngredient = new Ingredient({ name: ingredient.name.toLowerCase()});
			await newIngredient.save();
		}
	}

	// save image locally
	const fs = require('fs');
	const path = require('path');
	// from base64 to png
	const base64Data = picture.replace(/^data:image\/png;base64,/, '');

	// get original picture extension from metdata

	const filename = `${recipe._id}.${encoding}`;
	const imagePath = path.join(__dirname, `../images/${filename}`);
	// fs.open(imagePath, 'wx', function (err, fileDescriptor) {
	// 	if (err) throw err;
	// 	if (!fileDescriptor) {
	// 		throw new Error('File could not be opened');
	// 	}
	// 	fs.writeFile(fileDescriptor, base64Data, function (err) {
	// 		if (err) throw err;
	// 		fs.close(fileDescriptor, function () {
	// 			console.log('File saved successfully');
	// 		});
	// 	})
	// });
	fs.writeFileSync(imagePath, base64Data, 'base64');
	recipe.picture = filename;

	await recipe.save();
	return res.send(recipe);
});


export default router;