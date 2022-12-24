import { ErrorDialog } from "~/utils/dialog";
import * as request from "~/utils/request";
export const getCategoriesTree = async (query) => {
	const response = await request.get("/categories?tree=true");
	return response;
};
export const getCategories = async (query) => {
	const response = await request.get("/categories");
	return response;
};
export const updateCategory = async (query) => {
	const { id, name, parent } = query;
	const reqData = {
		name,
	};
	if (parent) {
		reqData.parent = parent.id;
	}
	const response = await request.put(`/categories/${id}`, reqData);
	return response;
};
export const createCategory = async (query) => {
	const { name, parent } = query;
	const reqData = {
		name,
	};
	if (parent) {
		reqData.parent = parent.id;
	}
	const response = await request.post(`/categories`, reqData);
	console.log(response);
	return response;
};
export const deleteCategory = async (id) => {
	const response = await request.deleteReq(`/categories/${id}`);
	return response;
};
