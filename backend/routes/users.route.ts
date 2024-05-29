import { Router } from "express";
import User from "../models/users.model";
import validators from "../common/validators";
import adminMiddleware from "../middlewares/adminMiddleware";
import jwt from "jsonwebtoken";
import constants from "../constants";
import Recipe from "../models/recipe.model"
import Review from "../models/review.model"
import Report from "../models/report.model"
import Ingredient from "../models/ingredient.model"
import userMiddleware from "../middlewares/userMiddleware";

const router = Router();

const reportThreshold = 0;

router.get("/test/:id", async (req, res) => {
	let user = (await User.findOne())?.toJSON() as any;
	res.send(user.test);
});

router.post("/login", async (req, res) => {
	const { error } = validators.login.validate(req.body);
	if(error) return res.status(400).send(error.details.map((e: any) => e.message));

	try {
		const { username, password } = req.body;
		let user = await User.findOne({ username: username });

		if (!user || !user.comparePassword(password))
			return res.status(404).send("Username and password do not match!");

		const payload = {id: user._id};
		const token = jwt.sign(payload, constants.JWT_SECRET);

		return res.send(token);
	} catch (e) {
		return res.status(400).send("Error: " + e);
	}
});

router.post('/register', async function (req: any, res: any, next: any) {
	const { error } = validators.register.validate(req.body);
	if(error) return res.status(400).send(error.details.map((e: any) => e.message));

	try {
		const { email, username, password } = req.body;
		let user = await User.findOne({ $or: [{ email: email }, { username: username }] });

		if(user != null)
			return res.status(400).send("User already exists!");

		user = new User({ email, username, password, type: "USER" });

		await user.save();

		return res.send("Registered successfully!");
	} catch (e) {
		return res.status(400).send("Error: " + e);
	}
});

router.get("/view", adminMiddleware, async (req, res) => {
	// send all users created in the system
	const users = await User.find();
	
	return res.send(users);
});


router.delete("/remove/:id", adminMiddleware, async (req, res) => {
	// remove user identified by "id" from database
	const { id } = req.params;
	const user = await User.findById(id);
	if (!user) {
		return res.status(404).send("User not found");
	}

	try {
		// delete the user's recipes and reviews
		await Recipe.deleteMany({ userId: id});
		await Review.deleteMany({ userId: id});

		// update reports
		const reports = await Report.find({ userId: id });
		reports.forEach( async function(report) {
			let uId;
			if (report.reportedEntityType == "RECIPE") {
				let recipe = await Recipe.findByIdAndUpdate(report.reportedEntityId, { $inc: { reportNo: -1 }});
				uId = recipe?.userId;
			} else {
				let review = await Review.findByIdAndUpdate(report.reportedEntityId, { $inc: { reportNo: -1 }});
				uId = review?.userId;
			}

			await User.findByIdAndUpdate(uId, { $inc: { reportNo: -1 }})
			await report.deleteOne();
		});
	} catch (e) {
		return res.status(400).send("An error occured: " + e);
	}

	await user.deleteOne();
	return res.status(200).send("User deleted successfully");
});

router.get("/reports", adminMiddleware, async (req, res) => {
	const users = await User.find({ reportNo: { $gte: reportThreshold }});
	return res.send(users.map((user) => {
		return {
			_id: user._id,
			username: user.username,
			email: user.email,
			reportNo: user.reportNo
		};
	}));
});

router.get("/reports/:id", adminMiddleware, async (req, res) => {
	const { id } = req.params;
	const user = await User.findById(id);
	if (!user) {
		return res.status(404).send("User not found");
	}
	return res.send(await Report.find({ reportedUserId: id }));
});

router.get('/type', userMiddleware, async function (req: any, res: any, next: any) {
	return res.send(req.user.type);
});

router.get("/username/:id", async (req, res) => {
	const { id }= req.params;
	return res.send((await User.findById(id))?.username);
});

router.get('/ingredients', userMiddleware, async function (req: any, res: any, next: any) {
	return res.send(req.user.ingredients);
});

router.post("/addIngredient", userMiddleware, async (req: any, res) => {
	const { error } = validators.ingredient.validate(req.body);
	if(error) return res.status(400).send(error.details.map((e: any) => e.message));

	try {
		const { ingredient } = req.body;
		let ingId = null;

		const existingIngredient = await Ingredient.findOne({ name: ingredient.toLowerCase() });
		if (existingIngredient) {
			ingId = existingIngredient._id;
		} else {
			const newIngredient = new Ingredient({ name: ingredient.toLowerCase()});
			await newIngredient.save();
			ingId = newIngredient._id;
		}

		if (!req.user.ingredients.map((ing: typeof Ingredient) => ing.name).includes(ingredient.toLowerCase())) {
			req.user.ingredients.push(
				{
					"name": ingredient.toLowerCase(),
					"ingredientId": ingId
				}
			);
			await req.user.save();
		}

		return res.status(200).send("Ingredient added successfully.");
	} catch (e) {
		return res.status(400).send("An error occured: " + e);
	}
});

export default router;
