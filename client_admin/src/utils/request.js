import axios from "axios";
import { ErrorDialog } from "./dialog";

const request = axios.create({
	baseURL: "https://api.toimuasach.click/api/v1",
	withCredentials: true,
});
const handleResponse = (response) => {
	if (response) {
		switch (response.status) {
			///2xx
			case 200:
				return response.data;
			/// 3xx

			/// 4xx
			case 401:
				//	ErrorDialog("Đăng nhập");
				return;
			default:
				ErrorDialog("unknown Error");
				return;
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
export default request;
