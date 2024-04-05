import jwt from "jsonwebtoken";
import constants from "../constants";
import User from "../models/users.model";
import { Response, NextFunction } from "express";

const adminMiddleware = async (req: any, res: Response, next: NextFunction) => {
    if(!req.headers.authorization) {
        console.log("Token not found.");
        return res.status(400).send("Unauthorized access!");
    }

    const token = req.headers.authorization.split(' ')[1];
    try {
        const decoded = jwt.verify(token, constants.JWT_SECRET);
        const userId = (<any>decoded).id;

        const user = await User.findById(userId);
        if(!user || user.type == "ADMIN") {
            return res.status(404).send("User matching this request not found or not admin!");
        }

        req.user = user;
        return next();
    } catch {
        console.log("Token not valid. JWT failed.");
        return res.status(400).send("Unauthorized access!");
    }
};

export default adminMiddleware;