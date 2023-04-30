import mongoose from "mongoose";

const DB = `mongodb+srv://ratnesh_tiwari:qwerty4193@cluster0.v2loj.mongodb.net/ping-chat?retryWrites=true&w=majority`;
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
