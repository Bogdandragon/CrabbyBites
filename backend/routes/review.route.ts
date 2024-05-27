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

router.get("/reported", adminMiddleware, async (req, res) => {
    try {
        let reviews = await Review.find({ reportNo: { $gte: reportThreshold } });
        res.send(reviews);
    } catch (e) {
        return res.status(400).send("An error occured: " + e);
    }
});

router.delete("/remove/:id", async (req, res) => {
    try {
        let review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).send("Review not found");
        }
        await Review.findByIdAndDelete(req.params.id);
        res.send("Review removed");
    } catch (e) {
        return res.status(400).send("An error occured: " + e);
    }
});


export default router;