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
	try {
		const response = await request.get("/users", {
			params: {
				limit,
				page,
			},
		});
		return response;
	} catch (error) {
		ErrorDialog();
	}
};
