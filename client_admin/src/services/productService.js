import { ErrorDialog } from "~/utils/dialog";
import * as request from "~/utils/request";
import { dataURLtoFile } from "~/utils/util";

export const getProducts = async (query) => {
	const { limit, page } = query;

	const response = await request.get("/books", {
		params: {
			limit,
			page,
		},
	});
	return response;
};
export const getProductById = async (id) => {
	const response = await request.get(`/books/${id}`, {});
	return response;
};
export const postProduct = async (query) => {
	const { value } = query;
	let book = convertBookModel(value);
	try {
		const response = await request.post(`/books`, book);
		return response;
	} catch (error) {
		ErrorDialog();
	}
};
export const updateProduct = async (value, id) => {
	console.log(value);
	let book = convertBookModel(value);
	console.log(book);
	try {
		const response = await request.put(`/books/${id}`, book);
		return response;
	} catch (error) {
		ErrorDialog();
	}
};
export const upLoadImages = async (data = []) => {
	let formData = new FormData();
	data.forEach((item) => {
		formData.append("images", item.file);
	});
	try {
		console.log(formData);
		const response = await request.post(`/books/upload`, formData, {
			headers: {
				"content-type": "multipart/form-data",
			},
		});
		return response;
	} catch (error) {
		ErrorDialog();
	}
};
export const convertBookModel = (product) => {
	let book = new Object();
	if (product.name) {
		book.name = product.name;
	}
	if (product.category) {
		book.category = product.category.id;
	} else {
		book.category = "";
	}
	if (product.description) {
		book.description = product.description;
	}
	if (product.authors) {
		book.authors = product.authors;
	}
	if (product.translators) {
		book.translators = product.translators;
	}
	if (product.sku) {
		book.sku = product.sku;
	}
	if (product.isbn13) {
		book.isbn13 = product.isbn13;
	}
	if (product.publisher) {
		book.publisher = product.publisher;
	}
	if (product.publisherDate) {
		book.publisherDate = product.publisherDate;
	}
	if (product.weight) {
		book.weight = product.weight;
	}
	if (product.height) {
		book.height = product.height;
	}
	if (product.width) {
		book.width = product.width;
	}
	if (product.page) {
		book.page = product.page;
	}
	if (product.images) {
		book.images = product.images;
	}
	if (product.bookCover) {
		book.bookCover = product.bookCover;
	}
	if (product.status) {
		book.status = product.status;
	}
	if (product.expectedDate) {
		book.expectedDate = product.expectedDate;
	}
	if (product.countInStock) {
		book.countInStock = product.countInStock;
	}
	if (product.originalPrice) {
		book.originalPrice = product.originalPrice;
	}
	if (product.discountRate) {
		book.discountRate = product.discountRate;
	}
	return book;
};
