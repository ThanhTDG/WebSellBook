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
	const response = await request.put(`${path}/${id}`, data);
	return response;
};
export const updateOrder = async (order, id) => {
	const data = convertOrder(order);
	const response = await request.post(`${path}/${id}`, data);
	return response;
};
export const deleteOrder = async (id) => {
	const response = await request.deleteReq(`${path}/${id}`);
	return response;
};
const convertOrder = () => {
	let object = new Object();
	return object;
};
