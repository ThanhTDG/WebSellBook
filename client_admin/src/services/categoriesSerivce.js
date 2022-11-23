import * as request from "~/utils/request";
export const getCategoriesTree = async (query) => {
	try {
		const response = await request.get("/category");
		return response;
	} catch (error) {
		window.alert("Lỗi xảy ra");
	}
};
export const getCategories = async (query) => {
	try {
		const response = await request.get("/categories");
		return response;
	} catch (error) {
		window.alert("Lỗi xảy ra");
		console.log(error);
	}
};
