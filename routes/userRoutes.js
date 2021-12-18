import mongoose from "mongoose";
import User from "../modals/userSchema.js";
import asyncHandler from "express-async-handler";
import express from "express";

const router = express.Router();

router.get(
	"/users",
	asyncHandler(async (req, res) => {
		const savedUsers = await User.find({});
		if (savedUsers) {
			return res.status(201).send(savedUsers);
		} else return res.status(500).send("Internal Server Error");
	})
);
router.post(
	"/verify",
	asyncHandler(async (req, res) => {
		const user = req.body;

		const userFound = await User.findById(user._id);
		if (userFound) {
			if (diff_minutes(userFound.lastLogin) < 60) {
				res.status(201).send(userFound);
			} else res.status(401);
		} else res.status(401);
	})
);

router.post(
	"/signin",
	asyncHandler(async (req, res) => {
		const { profileObj } = req.body;
		const { imageUrl, email, name, givenName } = profileObj;
		const userExist = await User.findOne({ email });
		if (userExist) {
			const updatedUser=await User.findOneAndUpdate({ _id: userExist._id }, { lastLogin: Date.now() });
			res.status(201).json({ user: updatedUser, msg: "User already exists" });
		} else {
			const newUser = new User({
				name,
				givenName,
				email,
				imageUrl,
			});
			const userSaved = await newUser.save();
			res.status(201).json({ user: userSaved });
		}
	})
);

const diff_minutes = (dt1) => {
	const dt2 = new Date();
	let diff = (dt2.getTime() - dt1.getTime()) / 1000;
	diff /= 60;
	return Math.abs(Math.round(diff));
};

export default router;
