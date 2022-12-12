import * as request from "~/utils/request";

const auth = "/auth";
export const login = async (username, password) => {
	const path = auth + "/signin";
	const params = {
		username,
		password,
		isAdmin: true,
	};
	const response = await request.post(path, params);
	return response;
};
export const getProfile = async () => {
	const path = auth + "/profile";
	const response = await request.get(path);
	return response;
};
