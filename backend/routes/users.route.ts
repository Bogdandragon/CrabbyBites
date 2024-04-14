import { Router } from "express";
import User from "../models/users.model";
import validators from "../common/validators";
import jwt from "jsonwebtoken";
import constants from "../constants";

const router = Router();

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
			return res.status(404).send("Username sau parolă greșite!");

		const payload = {id: user._id};
		const token = jwt.sign(payload, constants.JWT_SECRET);

		return res.send(token);
	} catch (e) {
		return res.status(400).send("S-a produs o eroare! " + e);
	}
});

router.post('/register', async function (req: any, res: any, next: any) {
	const { error } = validators.register.validate(req.body);
	if(error) return res.status(400).send(error.details.map((e: any) => e.message));

	try {
		const { email, username, password } = req.body;
		let user = await User.findOne({ username: username });

		if(user != null)
			return res.status(400).send("Utilizatorul deja există!");

		user = new User({ email, username, password, type: "USER" });

		await user.save();

		return res.send("Înregistrat cu succes!");
	} catch (e) {
		return res.status(400).send("S-a produs o eroare! " + e);
	}
});

export default router;
