import { Router } from "express";
import User from "../models/users.model";
import Recipe from "../models/recipe.model";
import bcrypt from "bcrypt";
import validators from "../common/validators";
import adminMiddleware from "../middlewares/adminMiddleware";
import userMiddleware from "../middlewares/userMiddleware";
import Ingredient from "../models/ingredient.model";
import { error } from "console";
import Review from "../models/review.model";
import Report from "../models/report.model";
import fs from "fs";

const router = Router();

const reportThreshold = 2;

router.get("/review", adminMiddleware, async (req, res) => {
	// send recipes with status "PENDING" or reportNo >= reportThreshold
	const recipes = await Recipe.find({ $or: [{ status: "PENDING" }, { reportNo: { $gte: reportThreshold } }] });
	let recipesJSON = await Promise.all(recipes.map(async (recipe) => {
		let picture = fs.readFileSync("./images/" + recipe.picture);
		return {
			_id: recipe._id,
			title: recipe.name,
			userId: recipe.userId,
			user: await User.findById(recipe.userId),
			picture: picture.toString("base64"),
			status: recipe.status,
			reportNo: recipe.reportNo
		};
	}));
	
	return res.send(recipesJSON);
});

router.get("/rejected", adminMiddleware, async (req, res) => {
	// send recipes with status "PENDING" or reportNo >= reportThreshold
	const recipes = await Recipe.find({ status: "REJECTED"});
	let recipesJSON = await Promise.all(recipes.map(async (recipe) => {
		let picture = fs.readFileSync("./images/" + recipe.picture);
		return {
			_id: recipe._id,
			title: recipe.name,
			userId: recipe.userId,
			user: await User.findById(recipe.userId),
			picture: picture.toString("base64"),
			status: recipe.status,
			reportNo: recipe.reportNo
		};
	}));
	
	return res.send(recipesJSON);
});

router.delete("/remove/:id", userMiddleware, async (req: any, res) => {
	// delete recipe with given id if it belongs to the requesting user
	const { id } = req.params;
	try {
		let recipe = await Recipe.findById(id);
		if (!recipe) {
			return res.status(404).send("Recipe not found");
		}
		
		if (!recipe.userId.equals(req.user._id)) {
			return res.status(400).send("Unauthorized action");
		}

		// update user report no
		await req.user.updateOne({ $inc: {reportNo: -recipe.reportNo} });
		// delete reviews, reports and appearances in favorites and todo lists
		await Review.deleteMany({ recipeId: id});
		await Report.deleteMany({ reportedEntityId: id});
		await User.updateMany({}, {
			$pull: {
				favoriteRecipes: id,
				todoRecipes: id
			}
		});

		await recipe.deleteOne();
		return res.status(200).send("Recipe deleted successfully");
	} catch (e) {
		return res.status(400).send("An error occured: " + e);
	}
});

router.get("/ingredients", async (req, res) => {
	try {
		const ingredients = await Ingredient.find();
		return res.status(200).send(ingredients);
	} catch (e) {
		return res.status(400).send("Error: " + e);
	}
});

router.get("/search", async (req, res) => {
	try {
		if (!req.query.ingredients) {
			return res.status(400).send("Invalid query");
		}
		const ingredients = (req.query.ingredients as string).split(",");
		const recipes = await Recipe.find({ ingredients: { $elemMatch: { name: { $in: ingredients } } } });
		recipes.sort((a, b) => {
			let aCount = 0;
			let bCount = 0;
			a.ingredients.forEach((ing) => {
				if (ingredients.includes(ing.name)) {
					aCount++;
				}
			});
			b.ingredients.forEach((ing) => {
				if (ingredients.includes(ing.name)) {
					bCount++;
				}
			});

			return bCount - aCount;
		});
		return res.status(200).send(recipes.map((rec) => {
			rec.picture = fs.readFileSync("./images/" + rec.picture).toString("base64");
			return rec;
		}));
	} catch (e) {
		return res.status(400).send("Error: " + e);
	}
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

router.post("/rate", userMiddleware, async (req: any, res) => {
	const { error } = validators.review.validate(req.body);
	if (error) return res.status(400).send(error.details.map((e: any) => e.message));

	try {
		const { id, rating, comment} = req.body;
		const recipe = await Recipe.findById(id);

		if (!recipe)
			return res.status(404).send("Recipe not found!");

		const userId = req.user._id;
		let review = new Review({userId, recipeId: id, rating, comment});
		await review.save();

		// update recipe rating
		let sum = 0;
		const reviews = await Review.find({ recipeId: id });
		reviews.forEach( async function(rev) {
			sum += rev.rating;
		});
		await recipe.updateOne({ rating: sum / reviews.length })

		return res.send("Review registered successfully!");
	} catch (e) {
		return res.status(401).send("Error: " + e);
	}
});

router.get("/view/:userId", userMiddleware, async (req, res) => {
	try {
		const { userId } = req.params;
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).send("User not found");
		}

		const recipes = await Recipe.find({ userId: userId});
		return res.status(200).send(recipes.map((rec) => {
			rec.picture = fs.readFileSync("./images/" + rec.picture).toString("base64");
			return rec;
		}));
	} catch (e) {
		return res.status(400).send("Error: " + e);
	}
});

router.get("/favorites/:userId", userMiddleware, async (req, res) => {
	try {
		const { userId } = req.params;
		let user = await User.findById(userId);
		if (!user) {
			return res.status(404).send("User not found");
		}

		const recipes = await Recipe.find({ _id: { $in: user.favoriteRecipes } });
		return res.status(200).send(recipes.map((rec) => {
			rec.picture = fs.readFileSync("./images/" + rec.picture).toString("base64");
			return rec;
		}));
	} catch (e) {
		return res.status(400).send("Error: " + e);
	}
});

router.get("/todo/:userId", userMiddleware, async (req, res) => {
	try {
		const { userId } = req.params;
		let user = await User.findById(userId);
		if (!user) {
			return res.status(404).send("User not found");
		}

		const recipes = await Recipe.find({ _id: { $in: user.todoRecipes } });
		return res.status(200).send(recipes.map((rec) => {
			rec.picture = fs.readFileSync("./images/" + rec.picture).toString("base64");
			return rec;
		}));
	} catch (e) {
		return res.status(400).send("Error: " + e);
	}
});

router.post("/add", userMiddleware, async (req: any, res: any, next: any) => {
	let validate = validators.addRecipe.validate(req.body);
	if (validate.error) {
		return res.status(400).send(validate.error.message);
	}

	// check if user exists
	const user = req.user;

	const { name, time, difficulty, portions, picture, encoding, category, description, ingredients, instructions } = req.body

	const recipe = new Recipe({
		name, time, difficulty, portions, picture, category, description, ingredients, instructions, userId: user._id
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

router.get("/reports/:id", adminMiddleware, async (req, res) => {
	const { id } = req.params;
	const recipe = await Recipe.findById(id);
	if (!recipe) {
		return res.status(404).send("Recipe not found");
	}
	return res.send(await Report.find({ reportedEntityId: id, reportedEntityType: "RECIPE" }));
});

router.get("/reviews/:id", async (req, res) => {
	const { id } = req.params;
	const recipe = await Recipe.findById(id);
	if (!recipe) {
		return res.status(404).send("Recipe not found");
	}
	return res.send(await Review.find({ recipeId: id }).sort({ _id: -1 }));
});

router.post("/report", userMiddleware, async(req: any, res) => {
	const { error } = validators.report.validate(req.body);
	if (error) return res.status(400).send(error.details.map((e: any) => e.message));

	try {
		const { id, comment, type} = req.body;
		
		let userId;
		switch(type) {
			case "RECIPE":
				const recipe = await Recipe.findById(id);
				if (!recipe) {
					return res.status(404).send("Recipe not found");
				}
				await recipe.updateOne({ $inc: { reportNo: 1 } });
				userId = recipe.userId;
				break;
			case "REVIEW":
				const review = await Review.findById(id);
				if (!review) {
					return res.status(404).send("Review not found");
				}
				await review.updateOne({ $inc: { reportNo: 1 } });
				userId = review.userId;
		}

		await User.findByIdAndUpdate(userId, { $inc: { reportNo: 1 } });

		let report = new Report({ userId: req.user._id, reportedUserId: userId, reportedEntityId: id, reportedEntityType: type, reason: comment });
		await report.save();

		return res.send("Report registered successfully!");
	} catch (e) {
		return res.status(401).send("Error: " + e);
	}
});

router.post("/addFavorite", userMiddleware, async(req: any, res) => {
	const { error } = validators.recipe.validate(req.body);
	if (error) return res.status(400).send(error.details.map((e: any) => e.message));

	try {
		const { id } = req.body;
		const recipe = await Recipe.findById(id);
		if (!recipe) {
			return res.status(404).send("Recipe not found");
		}

		await User.findByIdAndUpdate(req.user._id, {
			$addToSet: {
				favoriteRecipes: id
			}
		});

		res.send("Favorite added successfully!");
	} catch (e) {
		return res.status(401).send("Error: " + e);
	}
});

router.post("/addTODO", userMiddleware, async(req: any, res) => {
	const { error } = validators.recipe.validate(req.body);
	if (error) return res.status(400).send(error.details.map((e: any) => e.message));

	try {
		const { id } = req.body;
		const recipe = await Recipe.findById(id);
		if (!recipe) {
			return res.status(404).send("Recipe not found");
		}

		await User.findByIdAndUpdate(req.user._id, {
			$addToSet: {
				todoRecipes: id
			}
		});

		res.send("Favorite added successfully!");
	} catch (e) {
		return res.status(401).send("Error: " + e);
	}
});

router.get("/similar/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const recipe = await Recipe.findById(id);
		if (!recipe) {
			return res.status(404).send("Recipe not found");
		}

		let sameCategory = await Recipe.find({ category: recipe.category });
		const ingrs = recipe.ingredients.map((ingredient) => ingredient.name );

		const similar = sameCategory.filter((r) => {
			let commonCount = 0;
			r.ingredients.forEach((ing) => {
				if (ingrs.includes(ing.name)) {
					commonCount++;
				}
			});

			return commonCount >= 3 && r.name != recipe.name;
		});

		if (similar.length <= 4) {
			res.status(200).send(similar);
		} else {
			const chosen: number[] = [];
			for (let i = 0; i < 4; i++) {
				let index = Math.floor(Math.random() * (similar.length - 1));
				while (chosen.includes(index)) {
					index = Math.floor(Math.random() * (similar.length - 1));
				}
				chosen.push(index);
			}

			res.status(200).send(chosen.map((idx) => similar[idx]).map((rec) => {
				rec.picture = fs.readFileSync("./images/" + rec.picture).toString("base64");
				return rec;
			}));
		}

	} catch (e) {
		return res.status(401).send("Error: " + e);
	}
});

export default router;