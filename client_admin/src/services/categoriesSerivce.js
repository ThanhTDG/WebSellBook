import { ErrorDialog } from "~/utils/dialog";
import * as request from "~/utils/request";
export const getCategoriesTree = async (query) => {
	const response = await request.get("/category");
	return response;
};
export const getCategories = async (query) => {
	const response = await request.get("/categories");
	return response;
};
