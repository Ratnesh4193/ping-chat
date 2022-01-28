import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

const DB = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.v2loj.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
mongoose
	.connect(DB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Database connected successfully");
	})
	.catch((err) => {
		console.log("Database connection failed :", err);
	});
