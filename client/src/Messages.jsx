import React from "react";
import "./messages.css";
function Messages(props) {
	const curUser = JSON.parse(localStorage.getItem("user"));
	const msgTime = new Date(props.time);
	return (
		<div>
			<div
				className={`message_body ${
					props.sender === curUser._id && "message_sent"
				}`}>
				<p className='message_title '>{props.name}</p>
				{props.msg}
				<p
					className={`message_time ${
						props.sender === curUser._id && "align_time_right"
					}`}
					style={{ display: "flex", flexDirection: "row" }}>
					<span>{msgTime.toLocaleDateString()}</span>

					<span>{msgTime.toLocaleTimeString()}</span>
				</p>
			</div>
		</div>
	);
}

export default Messages;
