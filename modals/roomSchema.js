import mongoose from "mongoose";

var roomSchema = new mongoose.Schema({
	participants: [{ type: mongoose.Types.ObjectId, ref: "User" }],
	messages: [{ type: mongoose.Types.ObjectId, ref: "Msg" }],
});

export default mongoose.model("Room", roomSchema);
