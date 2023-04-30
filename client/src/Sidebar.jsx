import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";
import { Avatar, IconButton } from "@mui/material";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import axios from "axios";

import SearchIcon from "@mui/icons-material/Search";
import ContactAvatar from "./ContactAvatar";

const Sidebar = (props) => {
	const [users, setUsers] = useState([]);
	const curUser = JSON.parse(localStorage.getItem("user"));
	useEffect(() => {
		async function getContacts() {
			try {
				const response = await axios.get("/users");
				const validUsers = response.data;
				setUsers(validUsers);
			} catch (err) {
				console.log(err);
			}
		}
		getContacts();
	}, []);

	return (
		<>
			<div className='sidebar'>
				<div className='sidebar_header'>
					<Avatar src={curUser.imageUrl} />
					<div className='sidebar_header_right'>
						<IconButton>
							<DonutLargeIcon />
						</IconButton>
						<IconButton>
							<ChatIcon />
						</IconButton>
						<IconButton>
							<MoreVertIcon />
						</IconButton>
					</div>
				</div>
				<div className='sidebar_search'>
					<SearchIcon />
					<input type='text' placeholder='Search to start a chat' />
				</div>
				<div className='sideContact_newcontact'>
					<h3>Add a new chat..</h3>
				</div>
				<div className='sideContact_all'>
					{users.map((user) => {
						if (user._id !== curUser._id) {
							return (
								<Link
									to={`/${user._id}`}
									style={{ textDecoration: "none", color: "black" }}>
									<ContactAvatar
										key={user._id}
										imgUrl={user.imageUrl}
										name={user.givenName}
										lastMsg='.'
									/>
								</Link>
							);
						} else return <></>;
					})}
				</div>
			</div>
		</>
	);
};
export default Sidebar;
