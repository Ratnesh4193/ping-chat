import mongoose from "mongoose";
import Pusher from "Pusher";

const db = mongoose.connection;

const pusher = new Pusher({
	appId: "1312491",
	key: "a772e071e6b3c70ffff1",
	secret: "3d18cc9d21e5dd53e1d7",
	cluster: "ap2",
	useTLS: true,
});

db.once("open", () => {
	const msgCollection = db.collection("msgs");
	const changeStream = msgCollection.watch();

	changeStream.on("change", (change) => {
		if (change.operationType === "insert") {
			const messageDetails = change.fullDocument;
			console.log(messageDetails);
			pusher.trigger("messages", "inserted", {
				_id: messageDetails._id,
				name: messageDetails.name,
				msg: messageDetails.msg,
				sender: messageDetails.sender,
				receiver: messageDetails.receiver,
				timestamp: messageDetails.timestamp,
			});
		}
	});
});
