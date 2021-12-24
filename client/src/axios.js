import axios from "axios";

const instance = axios.create({
	baseURL: "https://localhost:8000",
});

export default instance;
