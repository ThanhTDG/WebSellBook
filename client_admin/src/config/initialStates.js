import { listBookStatus } from "./Book/bookStatus";
import { typeSearch } from "./Book/options";
import { limitRowsBook } from "./table";

export const products = {
	indexStatus: 0,
	status: listBookStatus[0].key,
	page: 1,
	limit: limitRowsBook.options[0],
	totalPages: 10,
};
export const filterProduct = {
	typeSearch: typeSearch.value[0].id,
	category: "",
	search: "",
	sort: typeSearch.value[0].id,
};
