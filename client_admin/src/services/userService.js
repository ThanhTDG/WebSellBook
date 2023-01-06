import * as request from "~/utils/request";

const path = "/users";
export async function getAllUser(query) {
	const { limit, page } = query;
	const response = await request.get(path, {
		params: {
			limit,
			page,
		},
	});
	return response;
}
export async function getAllAdmin(query) {
	const { limit, page } = query;
	const response = await request.get(`${path}/admin`, {
		params: {
			limit,
			page,
		},
	});
	return response;
}
export async function resetPassword(id) {
	const response = await request.put(`${path}/${id}/resetpassword`);
	return response;
}
export async function getAllCustomer(query) {
	const { limit, page } = query;
	const response = await request.get(`${path}/customer`, {
		params: {
			limit,
			page,
		},
	});
	return response;
}
export async function getUserById(id) {
	const response = await request.get(`${path}/${id}`);
	return response;
}
