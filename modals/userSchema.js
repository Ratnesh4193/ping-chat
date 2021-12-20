import mongoose from "mongoose";
// imageUrl,email,name,givenName
var userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	givenName: { type: String, required: true },
	email: { type: String, required: true },
	imageUrl: { type: String, required: true },
	lastLogin: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);

