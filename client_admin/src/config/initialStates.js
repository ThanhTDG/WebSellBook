import BookConfig from "./Book";
import { limitRow } from "./table";

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
	sort: BookConfig.options.typeSort.value[0].id,
};
