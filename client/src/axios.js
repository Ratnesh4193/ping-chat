import axios from "axios";
import dotenv from "dotenv";

dotenv.config(); //for accessing env variables

const PORT = process.env.PORT || 8000;
console.log(PORT);
const instance = axios.create({
	baseURL: `https://ping-chat.herokuapp.com/${PORT}`,
});

export default instance;
