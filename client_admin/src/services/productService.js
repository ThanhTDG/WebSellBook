import { ErrorDialog } from "~/utils/dialog";
import * as request from "~/utils/request";
import { dataURLtoFile } from "~/utils/util";

export const getProducts = async (query) => {
	const { limit, page, status } = query;
	let params = {
		limit,
		page,
	};
	if (status) {
		params.status = status;
	}
	const response = await request.get("/books", {
		params: {
			...params,
		},
	});
	return response;
};
export const getProductById = async (id) => {
	const response = await request.get(`/books/${id}`, {});
	return response;
};
export const postProduct = async (value) => {
	let book = convertBookModel(value);
	return {
		id: "634ed8e4f6a3a7266d99276d",
		name: "Thiên Sứ Nhà Bên – Tập 3",
		description:
			"“Mọi người đều thân thiết với Amane, chỉ có tôi như bị cho ra rìa vậy đó.” \\nMahiru và Amane đã lên lớp 11, họ trở thành bạn cùng lớp với nhau! Trái với Mahiru luôn cố gắng thu hẹp khoảng cách kể cả khi ở trường, Amane vẫn giữ ý với “thiên sứ” và không tiến thêm một bước nào. \\nNhờ có Chitose mà Mahiru dần xóa bỏ bức tường ngăn cách với các bạn cùng lớp, trong khi Amane lại nhớ đến vết thương cũ vừa lành trong\\nĐây là câu chuyện tình ngọt ngào với cô gái nhà bên tuy lạnh lùng nhưng thật đáng yêu đã được ủng hộ nhiệt tình trên trang Shousetsuka ni Narou.\\n* THIÊN SỨ NHÀ BÊN được xem là cú hit của dòng Light Novel rom-com tại thị trường Nhật Bản, với nội dung hài hước - lãng mạn rất được yêu thích. Tác phẩm nằm top 10 Kono Light novel ga Sugoi năm 2021, đã bán ra hơn 400.000 bản chỉ với 4 tập truyện riêng tại Nhật Bản.\\nSố tập: 5+ (on-going)\\nThiên Sứ Nhà Bên – Tập 3 – Phiên bản tặng kèm Bookmark\\n---Một ấn phẩm của WINGS BOOKS - Thương hiệu sách trẻ của NXB Kim Đồng.Giá sản phẩm trên ToiMuaSach đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như phí vận chuyển, phụ phí hàng cồng kềnh, thuế nhập khẩu (đối với đơn hàng giao từ nước ngoài có giá trị trên 1 triệu đồng).....\n",
		slug: "thien-su-nha-ben-tap-3",
		authors: "Saekisan, Hanekoto",
		translators: "Trân Trân",
		sku: "8935244872972",
		isbn13: "978-0134494166",
		isbn10: "3033204",
		supplier: "Nhà Xuất Bản Kim Đồng",
		publisher: "NXB Kim Đồng",
		publisherDate: "2022-04-30",
		images: ["https://salt.tikicdn.com/ts/product/01/93/08/61e928ce145c06a11a483ed49d826da2.jpg"],
		weight: 350,
		height: 19,
		width: 13,
		page: 316,
		bookCover: "Bìa mềm",
		status: "available",
		expectedDate: "2022-04-30",
		countInStock: 100,
		sold: 10,
		originalPrice: 95000,
		discountRate: 25,
		price: 72000,
		category: {
			_id: "634d8da516d1688abe54d4ef",
			name: "Light novel",
		},
	};
};
export const updateProduct = async (value, id) => {
	let book = convertBookModel(value);
	const response = await request.put(`/books/${id}`, book);
	return response;
};
export const upLoadImages = async (data = []) => {
	let formData = new FormData();
	data.forEach((item) => {
		formData.append("images", item.file);
	});
	const response = await request.post(`/books/upload`, formData, {
		headers: {
			"content-type": "multipart/form-data",
		},
	});
	return response;
};
export const deleteImages = async (data = []) => {
	const response = await request.post(`/books/destroy`, {
		images: data,
	});
	return response;
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
