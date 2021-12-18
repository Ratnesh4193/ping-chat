import express from "express";
import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import Msg from "../modals/msgSchema.js";

const router = express.Router();

router.post(
	"/msg/new",
	asyncHandler(async (req, res) => {
		const { msg, sentBy } = req.body;
		const user = JSON.parse(sentBy);
		console.log(user);
		const newMsg = new Msg({
			name: user.name,
			sentBy: user._id,
			msg,
			timestamp: new Date().toString(),
		});
		console.log(newMsg);
		const savedMsg = await newMsg.save();

		if (savedMsg) {
			res.status(201).json(savedMsg);
		} else res.status(401).send("Msg not saved .");
	})
);
router.get(
	"/sync",
	asyncHandler(async (req, res) => {
		const msgs = await Msg.find({});
		if (msgs) res.status(201).send(msgs);
		else res.status(401).send("msgs not fetched");
	})
);
export default router;
