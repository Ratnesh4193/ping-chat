import express from "express";
import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import Msg from "../modals/msgSchema.js";
import Room from "../modals/roomSchema.js";
import Encrypter from "../utils/encrypter.js";
const encrypter = new Encrypter("process.env.SECRET_KEY");

const router = express.Router();

router.post(
	"/msg/new/",
	asyncHandler(async (req, res) => {
		console.log("Sending Msg.....");

		const { msg, sender, receiver, name } = req.body;
		// saving msg to a common database
		const encrypted = encrypter.encrypt(msg);
		// console.log(msg, sender, receiver, name);
		const newMsg = new Msg({
			sender,
			receiver,
			msg: encrypted,
			name,
		});
		const savedMsg = await newMsg.save();
		// // adding msg id to the cur room

		const participants = [sender, receiver];
		participants.sort();
		const curRoom = await Room.findOne({ participants });
		if (curRoom) {
			curRoom.messages.push(savedMsg);
			const updatedRoom = await curRoom.save();

			savedMsg.roomId = curRoom._id;
			const updatedMsg = await savedMsg.save();
			res.status(201).send(updatedRoom);
		} else {
			console.log("Creating new Room");
			const participants = [sender, receiver];
			participants.sort();
			const newRoom = new Room({
				participants,
				messages: [savedMsg],
			});
			console.log(newRoom);
			const savedRoom = await newRoom.save();
			res.status(201).json({ savedRoom });
		}
		// res.send("hello World");
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
		if (room) {
			const newMessages = room.messages.map((x) => {
				x.msg = encrypter.dencrypt(x.msg);
				return x;
			});
			room.messages = newMessages;

			res.status(201).send(room);
		} else res.status(201).send({ messages: [], _id: "" });
	})
);

router.post("/decrypt", (req, res) => {
	const decrytedMsg = encrypter.dencrypt(req.body.msg);

	res.status(200).send({ msg: decrytedMsg });
});
export default router;
