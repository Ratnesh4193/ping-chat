import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./Sidebar";
import Chatbox from "./Chatbox";
import Chatbox1 from "./Chatbox1";
import axios from "axios";
import GoogleLogin from "react-google-login";

const App = () => {
	//states
	const [curUser, setCurUser] = useState();

	// GoogleLogin

	const responseGoogle = (res) => {
		console.log(res);
		async function fetchUser() {
			try {
				const response = await axios.post("/signin", res, {
					headers: { "Content-Type": "application/json" },
				});
				const foundUser = response.data.user;
				localStorage.setItem("user", JSON.stringify(foundUser));
				setCurUser(foundUser);
			} catch (err) {
				console.log(err);
			}
		}
		fetchUser();
	};

	const responseFailureGoogle = (error, message) => {
		alert("Error : Please Try Again !!!");
	};

	// Initial Rendering
	useEffect(() => {
		const storedUser = localStorage.getItem("user");
		if (storedUser) {
			async function checkUser() {
				try {
					const validUser = await axios.post("/verify", storedUser, {
						headers: { "Content-Type": "application/json" },
					});
					if (validUser) {
						setCurUser(storedUser);
					}
				} catch (err) {
					console.log(err);
				}
			}
			checkUser();
		}
	});

	if (!curUser) {
		return (
			<div className='google_login'>
				<div className='login-body'>
					<GoogleLogin
						className='google_login_btn'
						clientId='752833155628-sm85intgmqbcc0dmrl22qcqsce5bthj2.apps.googleusercontent.com'
						buttonText='Login with Google'
						onSuccess={responseGoogle}
						onFailure={responseFailureGoogle}
						cookiePolicy={"single_host_origin"}
					/>
				</div>
			</div>
		);
	} else {
		return (
			<Router>
				<div className='app'>
					<div className='app-body'>
						<Sidebar />
						<Routes>
							<Route path='/' element={<Chatbox1 />} />
							<Route path='/:contactId' element={<Chatbox user={curUser} />} />
						</Routes>
					</div>
				</div>
			</Router>
		);
	}
};

export default App;

//  />;
