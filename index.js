import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Pusher from "pusher";

import asyncHandler from "express-async-handler";

import "./schema.js";
import "./routes/msgRoutes.js";
import "./db/conn.js";
import Msg from "./modals/msgSchema.js";

const pusher = new Pusher({
	appId: "1312491",
	key: "a772e071e6b3c70ffff1",
	secret: "3d18cc9d21e5dd53e1d7",
	cluster: "ap2",
	useTLS: true,
});

const app = express();

const jsonParser = bodyParser.json();
app.use(jsonParser);
var urlencodedParser = bodyParser.urlencoded({ extended: false });
dotenv.config(); //for accessing env variables

//using pusher

const db = mongoose.connection;

db.once("open", () => {
	console.log("Db connected");
	const msgCollection = db.collection("msgs");
	const changeStream = msgCollection.watch();

	changeStream.on("change", (change) => {
		if (change.operationType === "insert") {
			const messageDetails = change.fullDocument;
			pusher.trigger("messages", "inserted", {
				name: messageDetails.name,
				msg: messageDetails.msg,
				received: messageDetails.received,
			});
		}
	});
});

app.get("/", (req, res) => {
	res.status(200).send("Hello World");
});

app.post(
	"/msg/new",
	asyncHandler(async (req, res) => {
		const { name, msg, received } = req.body;

		const newMsg = new Msg({
			name,
			msg,
			timestamp: new Date().toString(),
			received,
		});

		const savedMsg = await newMsg.save();

		if (savedMsg) {
			res.status(201).json(savedMsg);
		} else res.status(401).send("Msg not saved .");
	})
);
app.get(
	"/sync",
	asyncHandler(async (req, res) => {
		const msgs = await Msg.find({});
		if(msgs)
		res.status(201).send(msgs);
		else res.status(401).send("msgs not fetched")
	})
);
app.use(express.json());
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
	console.log(`server running at ${PORT}`);
});
