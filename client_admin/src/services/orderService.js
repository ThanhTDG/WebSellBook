import * as request from "~/utils/request";

const path = "/orders";

export const getOrders = async (query) => {
	const { limit, page } = query;
	const response = await request.get(path, {
		params: {
			limit,
			page,
		},
	});
	return response;
};
export const getOrderById = async (id) => {
	const response = await request.get(`${path}/${id}`);
	return response;
};
export const createOrder = async (order, id) => {
	const data = convertOrder(order);
	const response = await request.post(`${path}`, data);
	return response;
};
export const updateOrder = async (order, id) => {
	const data = convertOrder(order);
	//	const response = await request.post(`${path}/${id}`, data);
	return {
		_id: "63b23ded39587d00b1e71217",
		userId: "6364b9331e34e4ec9128cf21",
		shippingInfo: {
			fullName: "Duong Hieu",
			phone: "0987654321",
			region: "Lam Dong",
			district: "Lam Ha",
			ward: "Nam Ban",
		},
		orderCode: "20230102674581",
		shippingMethod: "Chuyen phat nhanh",
		paymentMethod: "Zalo pay",
		items: [
			{
				quantity: 2,
				_id: "63b23ded39587d00b1e71218",
				book: {
					_id: "634ed8e4f6a3a7266d99276c",
					name: "Và Rồi Tháng 9 Không Có Cậu Đã Tới (Tái Bản)",
					images: [
						"https://salt.tikicdn.com/ts/product/71/5d/73/452c13036f33dce794f0a2e5bc4d7a9b.jpg",
						"https://salt.tikicdn.com/ts/product/24/7e/b7/b475426dde4ec205a5a798bb0a8d38f5.jpg",
						"https://salt.tikicdn.com/ts/product/5e/47/08/10e3ca5b14e57cdf8ff6f4972ece502f.jpg",
						"https://salt.tikicdn.com/ts/product/0b/b9/78/211f59f26a78981a6260a8fecb608ce2.jpg",
					],
					id: "634ed8e4f6a3a7266d99276c",
					originalPrice: 106000,
					discountRate: 23,
					price: 82000,
				},
				total: 164000,
			},
		],
		status: "shipping",
		transportFee: 15000,
		discount: 12000,
		purchaseDate: null,
		createdAt: "2023-01-02T02:14:05.610Z",
		updatedAt: "2023-01-03T13:11:46.260Z",
		shippingCode: "",
		process: {
			not_processed: "2023-01-03T13:09:20.925Z",
			processing: "2023-01-03T13:11:17.781Z",
			shipping: "2023-01-03T13:11:31.365Z",
			completed: null,
			canceled: null,
		},
		paid: 0,
		id: "63b23ded39587d00b1e71217",
		user: {
			_id: "6364b9331e34e4ec9128cf21",
			id: "6364b9331e34e4ec9128cf21",
			firstName: "hang",
			lastName: "khach",
			email: "khachhang@example.com",
			phone: "0987654321",
			sex: true,
			birthday: "2000-12-31T17:00:00.000Z",
		},
		total: 167000,
	};
};
export const deleteOrder = async (id) => {
	const response = await request.deleteReq(`${path}/${id}`);
	return response;
};
const convertOrder = (order) => {
	let object = new Object();
	if (order.fullName) {
		object.fullName = order.fullName;
	}
	if (order.phone) {
		object.phone = order.phone;
	}
	if (order.region) {
		object.region = order.region;
	}
	if (order.district) {
		object.district = order.district;
	}
	if (order.shippingCode) {
		object.shippingCode = order.shippingCode;
	}
	if (order.shippingMethod) {
		object.shippingMethod = order.shippingMethod;
	}
	if (order.paymentMethod) {
		object.paymentMethod = order.paymentMethod;
	}
	if (order.transportFee) {
		object.transportFee = order.transportFee;
	}
	if (order.discount) {
		object.discount = order.discount;
	}
	if (order.status) {
		object.status = order.status;
	}
	if (order.purchaseDate) {
		object.purchaseDate = order.purchaseDate;
	}
	if (order.paid) {
		object.paid = order.paid;
	}
	return object;
};
