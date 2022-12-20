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
export const updateCategory = async (query) => {
	const { id, name, parent } = query;
	const reqData = {
		...name,
		parent: parent.id,
	};
	const response = await request.put(`/categories/${id}`, reqData);
	return response;
};
export const createCategory = async (query) => {
	const { name, parent } = query;
	const reqData = {
		...name,
	};
	if (parent) {
		reqData.parent = parent.id;
	}
	const response = await request.post(`/categories`, reqData);
	return response;
};
