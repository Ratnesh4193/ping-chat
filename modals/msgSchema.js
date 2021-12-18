import mongoose from "mongoose";

var msgSchema = new mongoose.Schema({
	name: { type: String, required: true },
	sentBy: { type: mongoose.Types.ObjectId, ref: "User" },
	msg: { type: String, required: true },
	timestamp: { type: String, default: new Date() },
});

export default mongoose.model("Msg", msgSchema);
