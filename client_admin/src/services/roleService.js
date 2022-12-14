import * as request from "~/utils/request";

const rolePath = "/roles";
const permissionsPath = "/permissions";

export const getRoles = async () => {
	const response = await request.get(rolePath);
	console.log(response, "response");
	return response;
};
export const getPermission = async () => {
	const response = await request.get(permissionsPath);
	return response;
};
