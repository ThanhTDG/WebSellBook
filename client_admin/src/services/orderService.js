import * as request from "~/utils/request";

const path = "/orders";

export const getOrders = async (query) => {
	const { limit, page, status } = query;
	console.log(query);
	let params = {
		limit,
		page,
	};
	if (status) {
		params.status = status;
	}
	console.log(params, "params");
	const response = await request.get(path, {
		params: { ...params },
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
	const response = await request.put(`${path}/${id}`, data);
	return response;
};
export const deleteOrder = async (id) => {
	const response = await request.deleteReq(`${path}/${id}`);
	return response;
};
const convertOrder = (order) => {
	let object = new Object();
	if (order.shippingInfo.fullName) {
		object.fullName = order.shippingInfo.fullName;
	}
	if (order.shippingInfo.phone) {
		object.phone = order.shippingInfo.phone;
	}
	if (order.shippingInfo.region) {
		object.region = order.shippingInfo.region;
	}
	if (order.shippingInfo.district) {
		object.district = order.shippingInfo.district;
	}
	if (order.shippingInfo.ward) {
		object.ward = order.shippingInfo.ward;
	}
	if (order.shippingInfo.address) {
		object.address = order.shippingInfo.address;
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
