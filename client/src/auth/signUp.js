import React from "react";
import { GoogleLogin } from "react-google-login";
import axios from "axios";

function SignUp() {
	const googleAuth = ({ profileObj }) => {
		axios({
			method: "post",
			url: "/auth/google/signup",
			data: {
				googleId: profileObj.googleId,
				email: profileObj.email,
				first_name: profileObj.givenName,
				last_name: profileObj.familyName,
			},
		})
			.then((res) => console.log(res.data))
			.catch((err) => console.log(err));
	};
	return (
		<GoogleLogin
			clientId='752833155628-sm85intgmqbcc0dmrl22qcqsce5bthj2.apps.googleusercontent.com'
			onSuccess={googleAuth}
			onFailure={googleAuth}
			cookiePolicy={"single_host_origin"}>
			<span>Sign Up with Google</span>
		</GoogleLogin>
	);
}

export default SignUp;
