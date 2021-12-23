import React from "react";
import "./Chatbox.css";
import { IconButton } from "@mui/material";
import ContactAvatar from "./ContactAvatar";
import InputEmoji from "react-input-emoji";
import SearchIcon from "@mui/icons-material/Search";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import LogoutIcon from "@mui/icons-material/Logout";

const Chatbox1 = ({ user }) => {
	const logOut = async () => {
		try {
			localStorage.clear("user");
			window.location.reload();
		} catch (err) {
			return err;
		}
	};

	return (
		<div className='chatBox'>
			<div className='chatBox_top'>
				<ContactAvatar
					className='chatBoxTop_left'
					name='temp'
					lastMsg='Last seen NEVER'
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
			<div className='chatBox_body '></div>
			<div className='chatBox_body_bottom'>
				<InputEmoji
					value=''
					cleanOnEnter
					placeholder='Please select a contact to start chat .....'
				/>
				<IconButton>
					<KeyboardVoiceIcon />
				</IconButton>
			</div>
		</div>
	);
};

export default Chatbox1;
