import axios from "axios";

const request = axios.create({
	baseURL: "https://api.toimuasach.click/api/v1",
});

export const get = async (path, option = {}) => {
	const response = await request.get(path, option);
	return response.data;
};

export default request;
