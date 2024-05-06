import express from 'express';
import http from "http";
import mongoose from "mongoose";
import constants from "./constants";

import usersRouter from "./routes/users.route";
import recipesRouter from "./routes/recipes.route";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
//const dotenv = require('dotenv').config();
mongoose.connect(constants.mongoURL)
    .then(() => {
        console.log("Connected to mongoDB");
    })
    .catch(e => console.log(e));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api/auth', usersRouter);
app.use('/api/recipes', recipesRouter);

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});