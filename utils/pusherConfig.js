import mongoose from "mongoose";
import Pusher from "pusher";

const db = mongoose.connection;

const pusher = new Pusher({
	appId: "1320424",
	key: "4c36d59173e80a8a0541",
	secret: "745116ce97a18be6eec6",
	cluster: "ap2",
	useTLS: true,
});

db.once("open", () => {
	const msgCollection = db.collection("msgs");
	const changeStream = msgCollection.watch();

	changeStream.on("change", (change) => {
		// console.log(change)
		if (change.operationType === "insert") {
			const messageDetails = change.fullDocument;
			pusher.trigger("messages", "inserted", {
				_id: messageDetails._id,
				name: messageDetails.name,
				msg: messageDetails.msg,
				sender: messageDetails.sender,
				receiver: messageDetails.receiver,
				timestamp: messageDetails.timestamp,
				roomId: messageDetails.roomId,
			});
			// console.log(messageDetails);
		}
	});
});
