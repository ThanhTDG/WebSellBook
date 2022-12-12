import { ErrorDialog } from "~/utils/dialog";
import * as request from "~/utils/request";

export const getCustomers = async (query) => {
	const { limit, page } = query;
	let test = {
		params: {
			limit,
			page,
		},
	};
	const response = await request.get("/users", {
		params: {
			limit,
			page,
		},
	});
	return response;
};
