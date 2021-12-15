import mongoose from "mongoose";
const msgSchema = mongoose.Schema({
	msg: String,
	name: String,
	timestamp: { type: Date, default: Date.now },
	received: Boolean,
});

const msgcontent= mongoose.model("msgcontent", msgSchema);
export default msgcontent;