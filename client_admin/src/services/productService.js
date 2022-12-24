import { ErrorDialog } from "~/utils/dialog";
import * as request from "~/utils/request";

export const getProducts = async (query) => {
	const { limit, page } = query;
	let test = {
		params: {
			limit,
			page,
		},
	};

	const response = await request.get("/books", {
		params: {
			limit,
			page,
		},
	});
	return response;
};
export const getProductById = async (query) => {
	const { id } = query;
	const response = await request.get(`/books/${id}`, {});
	return response;
};
export const postProduct = async (query) => {
	return {
		_id: "634ed8e4f6a3a7266d99276d",
		name: "Thiên Sứ Nhà Bên – Tập 3",
		description:
			"“Mọi người đều thân thiết với Amane, chỉ có tôi như bị cho ra rìa vậy đó.” \\nMahiru và Amane đã lên lớp 11, họ trở thành bạn cùng lớp với nhau! Trái với Mahiru luôn cố gắng thu hẹp khoảng cách kể cả khi ở trường, Amane vẫn giữ ý với “thiên sứ” và không tiến thêm một bước nào. \\nNhờ có Chitose mà Mahiru dần xóa bỏ bức tường ngăn cách với các bạn cùng lớp, trong khi Amane lại nhớ đến vết thương cũ vừa lành trong\\nĐây là câu chuyện tình ngọt ngào với cô gái nhà bên tuy lạnh lùng nhưng thật đáng yêu đã được ủng hộ nhiệt tình trên trang Shousetsuka ni Narou.\\n* THIÊN SỨ NHÀ BÊN được xem là cú hit của dòng Light Novel rom-com tại thị trường Nhật Bản, với nội dung hài hước - lãng mạn rất được yêu thích. Tác phẩm nằm top 10 Kono Light novel ga Sugoi năm 2021, đã bán ra hơn 400.000 bản chỉ với 4 tập truyện riêng tại Nhật Bản.\\nSố tập: 5+ (on-going)\\nThiên Sứ Nhà Bên – Tập 3 – Phiên bản tặng kèm Bookmark\\n---Một ấn phẩm của WINGS BOOKS - Thương hiệu sách trẻ của NXB Kim Đồng.Giá sản phẩm trên ToiMuaSach đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như phí vận chuyển, phụ phí hàng cồng kềnh, thuế nhập khẩu (đối với đơn hàng giao từ nước ngoài có giá trị trên 1 triệu đồng).....\n",
		slug: "thien-su-nha-ben-tap-3",
		authors: "Saekisan, Hanekoto",
		translators: "Trân Trân",
		sku: "8935244872972",
		isbn13: "978-0134494166",
		isbn10: "0134494164",
		supplier: "Nhà Xuất Bản Kim Đồng",
		publisher: "NXB Kim Đồng",
		publisherDate: "2022-04-30T00:00:00.000Z",
		images: ["https://salt.tikicdn.com/ts/product/01/93/08/61e928ce145c06a11a483ed49d826da2.jpg"],
		weight: 350,
		height: 19,
		width: 13,
		page: 316,
		bookCover: "Bìa mềm",
		status: "available",
		expectedDate: "2022-04-30T00:00:00.000Z",
		countInStock: 100,
		sold: 10,
		originalPrice: 95000,
		discountRate: 25,
		price: 72000,
		category: "634d8da516d1688abe54d4ef",
	};
	try {
		const response = await request.post("/books", {
			params: {
				...query,
			},
		});

		return response;
	} catch (error) {
		ErrorDialog();
	}
};
export const putProduct = async (query) => {
	return;
	try {
		const response = await request.post("/books", {
			params: {
				...query,
			},
		});

		return response;
	} catch (error) {
		ErrorDialog();
	}
};
export const upLoadImages = async (query) => {
	const { id, fmData } = query;
	try {
		const response = await request.post(`/books/${id}/upload`, fmData, {
			headers: {
				"content-type": "multipart/form-data",
			},
		});
		return response;
	} catch (error) {
		ErrorDialog();
	}
};
