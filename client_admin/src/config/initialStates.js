import { listBookStatus } from "./Book/bookStatus";
import { limitRowsBook } from "./table";

export const products = {
	indexStatus: 0,
	status: listBookStatus[0].key,
	page: 1,
	limit: limitRowsBook.options[0],
	totalPages: 10,
};
