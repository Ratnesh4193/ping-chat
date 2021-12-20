import express from "express";
import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import Msg from "../modals/msgSchema.js";
import Room from "../modals/roomSchema.js";

const router = express.Router();

router.post(
	"/msg/new/",
	asyncHandler(async (req, res) => {
		console.log("Sending Msg.....");
		const { msg, sender, receiver, name } = req.body;
		// saving msg to a common database
		const newMsg = new Msg({
			sender,
			receiver,
			msg,
			name,
			timestamp: new Date().toString(),
		});

		const savedMsg = await newMsg.save();
		// adding msg id to the cur room

		const participants = [sender, receiver];
		participants.sort();
		const curRoom = await Room.findOne({ participants });

		if (curRoom) {
			curRoom.messages.push(savedMsg);
			const updatedRoom = await curRoom.save();
			savedMsg.roomId = curRoom;
			await savedMsg.save();
			res.status(201).json(updatedRoom);
		} else {
			console.log("Creating new Room");
			const participants =[sender, receiver];
			participants.sort()
			const newRoom = new Room({
				participants,
				messages: [savedMsg],
			});
			const savedRoom = await newRoom.save();
			res.status(201).json({ savedRoom });
		}
	})
);
router.post(
	"/sync",
	asyncHandler(async (req, res) => {
		console.log("Getting all room messages.......");
		const { sender, participants } = req.body;

		participants.sort();

		const room = await Room.findOne({ participants }).populate("messages", {
			msg: 1,
			name: 1,
			sender: 1,
			receiver: 1,
			timestamp: 1,
			roomId: 1,
		});

		if (room) res.status(201).send(room);
		else res.status(201).send({ messages: [], _id: "" });
	})
);
export default router;
