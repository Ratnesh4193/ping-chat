import mongoose from "mongoose";

var msgSchema = new mongoose.Schema({
	name: { type: String, required: true },
	msg: { type: String, required: true },
	timestamp: { type: String, default: new Date() },
	received: { type: Boolean, required: true },
});

export default mongoose.model("Msg", msgSchema);
