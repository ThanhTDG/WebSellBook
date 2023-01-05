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
export const logout = async () => {
	const path = auth + "/signout";
	const response = await request.post(path);
	return response;
};
export const uploadAvatar = async (file) => {
	const path = auth + "/uploadavatar";
	console.log(file);
	let frm = new FormData();
	frm.append("avatar", file);
	const response = await request.put(`${path}`, frm);
	return response;
};
