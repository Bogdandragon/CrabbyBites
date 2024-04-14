import { Router } from "express";
import User from "../models/users.model";
import bcrypt from "bcrypt";
import validators from "../common/validators";
import adminMiddleware from "../middlewares/adminMiddleware";

const router = Router();

router.get("/test/:id", async (req, res) => {
	let user = (await User.findOne())?.toJSON() as any;
	res.send(user.test);
});

router.post("/login", async (req, res) => {
	let validate = validators.login.validate(req.body);
	if (validate.error) {
		return res.status(400).send(validate.error.message);
	}

	const { username, password } = req.body;
	const user = await User.findOne({ username: username });
	if (!user) {
		return res.status(404).send("User not found");
	}
	return res.send(user);
});

router.get("/view", adminMiddleware, async (req, res) => {
	// send all users created in the system
	const users = await User.find();
	
	return res.send(users);
});

router.delete("/remove/:id", adminMiddleware , async (req, res) => {
	// remove user identified by "id" from database
	const { id } = req.params;
	const user = await User.findByIdAndDelete(id);
	if (!user) {
		return res.status(404).send("User not found");
	}
	return res.status(200).send("User deleted successfully");
});

export default router;
