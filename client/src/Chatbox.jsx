import React, { useState, useEffect, useRef, useMemo } from "react";
import "./Chatbox.css";
import { IconButton } from "@mui/material";
import ContactAvatar from "./ContactAvatar";
import Messages from "./Messages";
import InputEmoji from "react-input-emoji";
import SearchIcon from "@mui/icons-material/Search";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import LogoutIcon from "@mui/icons-material/Logout";
import SendIcon from "@mui/icons-material/Send";

import axios from "axios";
import { useParams } from "react-router-dom";
import Pusher from "pusher-js";

const Chatbox = ({ user }) => {
	const { contactId } = useParams();
	const [receiverId, setReceiverId] = useState("");
	const [curMsg, setCurMsg] = useState("");
	const [curRoom, setCurRoom] = useState("");
	const [curContact, setCurContact] = useState("");
	const [messages, setMessages] = useState([]);
	const [initial, setInitial] = useState(true);
	const curUser = JSON.parse(localStorage.getItem("user"));
	const participants = useMemo(
		() => [curUser._id, contactId],
		[curUser._id, contactId]
	);

	const messageRef = useRef(null);

	useEffect(() => {
		if (messageRef.current) {
			messageRef.current.scrollIntoView({
				behavior: "smooth",
				block: "end",
				inline: "nearest",
			});
		}
	}, [messages]);

	participants.sort();

	if (receiverId !== contactId) {
		setReceiverId(contactId);
		setCurMsg("");
		setCurRoom("");
		setMessages([]);
		setInitial(1);
	}
	const logOut = async () => {
		try {
			localStorage.clear("user");
			window.location.reload();
		} catch (err) {
			return err;
		}
	};

	const sendMsg = async (e) => {
		try {
			if (curMsg !== "") {
				const userMsg = {
					name: curUser.givenName,
					msg: curMsg,
					sender: curUser._id,
					receiver: contactId,
				};
				const msgSent = await axios.post("./msg/new", userMsg, {
					headers: { "Content-Type": "application/json" },
				});
				if (msgSent) {
					setCurMsg("");
				}
			}
		} catch (err) {
			console.log(err);
		}
	};
	// Fetching Current Chat Messages
	useEffect(() => {
		async function fetchData() {
			try {
				const temp = await axios.get(`userdetails/${contactId}`);
				setCurContact(temp.data);
				if (participants.length > 0) {
					const room = await axios.post(
						"/sync",
						{ sender: curUser, participants },
						{
							headers: { "Content-Type": "application/json" },
						}
					);
					setCurRoom(room.data._id);
					setInitial(false);
					setMessages(room.data.messages);
				}
			} catch (err) {
				console.log(err);
			}
		}
		if (initial) fetchData();
	}, [participants, curUser, initial, contactId]);

	// Adding New message just sent using PUSHER

	useEffect(() => {
		const pusher = new Pusher("4c36d59173e80a8a0541", {
			cluster: "ap2",
		});
		const channel = pusher.subscribe("messages");
		channel.bind("inserted", async (data) => {
			const decrypt_msg = await axios.post(
				"./decrypt",
				{ msg: data.msg },
				{
					headers: { "Content-Type": "application/json" },
				}
			);
			data.msg = decrypt_msg.data.msg;
			if (data.roomId === curRoom._id) setMessages([...messages, data]);
		});

		return () => {
			channel.unbind_all();
			channel.unsubscribe();
		};
	}, [messages, curRoom]);
	return (
		<div className='chatBox'>
			<div className='chatBox_top'>
				<ContactAvatar
					className='chatBoxTop_left'
					name={curContact.name}
					lastMsg='Online'
					imgUrl={curContact.imageUrl}
				/>
				<div
					className='chatBoxTop_right'
					style={{ display: "flex", justifyContent: "flex-end" }}>
					<IconButton>
						<SearchIcon />
					</IconButton>
					<IconButton>
						<AttachFileIcon />
					</IconButton>
					<IconButton>
						<LogoutIcon onClick={logOut} />
					</IconButton>
				</div>
			</div>
			<div className='chatBox_body '>
				{messages.map(({ _id, sender, name, msg, timestamp }) => {
					return (
						<Messages
							key={_id}
							name={name}
							msg={msg}
							time={timestamp}
							sender={sender}
						/>
					);
				})}
				{<div ref={messageRef}></div>}
			</div>
			<div className='chatBox_body_bottom'>
				<InputEmoji
					value={curMsg}
					onChange={(e) => {
						setCurMsg(e);
					}}
					cleanOnEnter
					onEnter={sendMsg}
					placeholder='Type message here...'
				/>
				<IconButton>
					<KeyboardVoiceIcon />
				</IconButton>
			</div>
		</div>
	);
};

export default Chatbox;
