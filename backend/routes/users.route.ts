import { Router } from "express";
import User from "../models/users.model";
import bcrypt from "bcrypt";
import validators from "../common/validators";

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

export default router;
