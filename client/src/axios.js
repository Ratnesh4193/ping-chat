import axios from "axios";
const PORT = process.env.PORT || 8000;
const instance = axios.create({
	baseURL: `https://localhost:${PORT}`,
});

export default instance;
