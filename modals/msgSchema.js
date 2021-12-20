import mongoose from "mongoose";

var msgSchema = new mongoose.Schema({
	name: { type: String, required: true },
	sender: { type: mongoose.Types.ObjectId, ref: "User" },
	receiver: { type: mongoose.Types.ObjectId, ref: "User" },
	msg: { type: String, required: true },
	timestamp: { type: String, default: new Date() },
	roomId: { type: mongoose.Types.ObjectId, ref: "Room" },
});

export default mongoose.model("Msg", msgSchema);
