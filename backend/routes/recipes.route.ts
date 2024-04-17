import { Router } from "express";
import User from "../models/users.model";
import Recipe from "../models/recipe.model";
import bcrypt from "bcrypt";
import validators from "../common/validators";
import adminMiddleware from "../middlewares/adminMiddleware";
import userMiddleware from "../middlewares/userMiddleware";
import fs from "fs";

const router = Router();

const reportThreshold = 2;

router.get("/review", adminMiddleware, async (req, res) => {
	// send recipes with status "PENDING" or reportNo >= reportThreshold
	const recipes = await Recipe.find({ $or: [{ status: "PENDING" }, { reportNo: { $gte: reportThreshold } }] });
	
	return res.send(recipes);
});

router.get("/:id", async (req, res) => {
	try {
		let recipe = await Recipe.findById(req.params.id);

		if (!recipe)
			return res.status(404).send("Recipe not found!");

		let recipeJSON = recipe.toJSON();
		fs.readFile("./images/" + recipeJSON.picture, (err, data) => {
			if (err) {
				recipeJSON.picture = "";
			} else {
				recipeJSON.picture = data.toString("base64");
			}
			return res.send(recipeJSON);
		});
	} catch (e) {
		return res.status(400).send("Error: " + e);
	}
});

router.post("/status", adminMiddleware, async (req, res) => {
	const { error } = validators.status.validate(req.body);
	if (error) return res.status(400).send(error.details.map((e: any) => e.message));

	try {
		const { id, status } = req.body;
		const recipe = await Recipe.findById(id);

		if (!recipe)
			return res.status(404).send("Recipe not found!");

		if (recipe.status !== "PENDING")
			return res.status(400).send("Recipe status is not PENDING!");

		recipe.status = status;
		await recipe.save();

		return res.send(recipe);
	} catch (e) {
		return res.status(400).send("Error: " + e);
	}
});

export default router;