import { Router } from "express";
import User from "../models/users.model";
import bcrypt from "bcrypt";

const router = Router();

router.get("/test", async (req, res) => {
	let user = (await User.findOne())?.toJSON() as any;
	res.send(user.test);
});

export default router;
