const statusOrder = {
	notProcessed: "not_processed",
	processing: "processing",
	shipping: "shipping",
	completed: "completed",
	canceled: "canceled",
};
export const refListStatus = [
	{
		key: "canceled",
		title: "Bị hủy",
		engTitle: "Canceled",
	},
	{
		key: "not_processed",
		title: "Chờ xử lý",
		engTitle: "waiting for processed",
	},
	{
		key: "processing",
		title: "Chờ xác nhận",
		engTitle: "Processing",
	},
	{
		key: "shipping",
		title: "Đang giao hàng",
		engTitle: "Shipping",
	},
	{
		key: "completed",
		title: "Giao thành công",
		engTitle: "completed",
	},
];

export default statusOrder;
