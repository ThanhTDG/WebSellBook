import BookConfig from "./Book";
import { limitRow } from "./ComponentConfigs/table";
import CustomerConfig from "./Customer";
export const products = {
	indexStatus: 0,
	status: BookConfig.listStatus[0].key,
	page: 1,
	limit: limitRow.options[0],
	totalPages: 10,
};
export const filterProduct = {
	typeSearch: BookConfig.options.typeSearch.value[0].id,
	category: "",
	search: "",
	sort: "",
};
export const customer = {
	indexStatus: 0,
	status: CustomerConfig.listStatus[0].key,
	page: 1,
	limit: limitRow.options[0],
	totalPages: 10,
};
export const filterCustomer = {
	typeSearch: CustomerConfig.options.typeSearch.value[0].id,
	category: "",
	search: "",
	sort: "",
};
export const globalState = {
	isLogin: false,
};
