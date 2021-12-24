import axios from "axios";
import dotenv from "dotenv";

const PORT = process.env.PORT || 8000;
console.log(PORT);
const instance = axios.create({
	baseURL: `https://localhost:${PORT}`,
});

export default instance;
