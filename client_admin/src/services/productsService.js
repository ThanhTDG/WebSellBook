import * as request from "~/utils/request";

export const getProducts = async (query) => {
	const { limit, page } = query;
	let test = {
		params: {
			limit,
			page,
		},
	};
	try {
		const response = await request.get("/books", {
			params: {
				limit,
				page,
			},
		});
		return response;
	} catch (error) {
		console.log(error);
	}
};
