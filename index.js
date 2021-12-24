import express from "express";
const app = express();

import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

const PORT = process.env.PORT || 8000;

if (process.env.NODE_ENV == "production") {
	app.use(express.static("client/build"));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

app.listen(PORT, () => {
	console.log(`server running at ${PORT}`);
});
