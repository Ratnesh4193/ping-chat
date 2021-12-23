import React from "react";
import { GoogleLogin } from "react-google-login";
import axios from "axios";

function SignIn() {
	const handleLogin = async ({ profileObj }) => {
		axios({
			method: "post",
			url: "/auth/google/signin",
			data: {
				googleId: profileObj.googleId,
				email: profileObj.email,
				fname: profileObj.givenName,
			},
		})
			.then((res) => console.log(res.data))
			.catch((err) => console.log(err));
	};
	return (
		<GoogleLogin
			clientId={process.env.REACT_APP_GOOGLE_CLENT_ID}
			onSuccess={handleLogin}
			onFailure={handleLogin}
			cookiePolicy={"single_host_origin"}
		/>
	);
}

export default SignIn;
