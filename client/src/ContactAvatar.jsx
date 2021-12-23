import React from 'react'
import "./contactAvatar.css";
import {Avatar} from '@mui/material'
const ContactAvatar = (props) => {
	return (
		<div className='contactAvatar'>
			<div className='contactAvatar_left'>
				<Avatar src={props.imgUrl} />
			</div>
			<div className='contactAvatar_right'>
				<div className='contactAvatar_right_title'>
					<h5 >{props.name}</h5>
				</div>
				<div className='contactAvatar_right_lmsg'>
					<h7>{props.lastMsg}</h7>
				</div>
			</div>
		</div>
	);
};

export default ContactAvatar
