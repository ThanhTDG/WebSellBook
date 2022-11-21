import axios from "axios";

const request = axios.create({
	baseURL: "https://toi-mua-sach.herokuapp.com/api",
});

export const get = async (path, option = {}) => {
	const response = await request.get(path, option);
	return response.data;
};

export default request;
