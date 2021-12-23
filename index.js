import express from "express";
const app = express();

import dotenv from "dotenv";
import cors from "cors";
import msgRoutes from "./routes/msgRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import "./db/conn.js";
import "./utils/pusherConfig.js";

dotenv.config(); //for accessing env variables
app.use(cors());

app.use(express.json());
app.use(msgRoutes);
app.use(userRoutes);


app.get("/", (req, res) => {
	res.status(200).send("Hello World");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
	console.log(`server running at ${PORT}`);
});
