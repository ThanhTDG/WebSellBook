import axios from "axios";
import { ErrorDialog } from "./dialog";

const request = axios.create({
	baseURL: "https://api.toimuasach.click/api/v1",
	withCredentials: true,
});
const handleResponse = (response) => {
	console.log(request);
	if (response) {
		switch (response.status) {
			///2xx
			case 200:
				return response.data;
			/// 3xx
			case 201:
				return response.data;
			/// 4xx
			case 401:
				//	ErrorDialog("Đăng nhập");
				return;
			default:
				return null;
		}
	}
};

export const get = async (path, option = {}) => {
	try {
		const response = await request.get(path, option);
		return handleResponse(response);
	} catch (error) {
		if (error.response) return handleResponse(error.response);
	}
};
export const post = async (path, option = {}, config = {}) => {
	try {
		const response = await request.post(path, option);
		return handleResponse(response);
	} catch (error) {
		if (error.response) return handleResponse(error.response);
	}
};
export const put = async (path, option = {}) => {
	try {
		const response = await request.put(path, option);
		return handleResponse(response);
	} catch (error) {
		if (error.response) return handleResponse(error.response);
	}
};
export const deleteReq = async (path, option = {}) => {
	try {
		const response = await request.delete(path, option);
		return handleResponse(response);
	} catch (error) {
		if (error.response) return handleResponse(error.response);
	}
};
export default request;
