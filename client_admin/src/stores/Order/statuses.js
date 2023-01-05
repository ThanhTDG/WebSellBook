const status = {
	all: "",
	notProcessed: "not_processed",
	processing: "processing",
	shipping: "shipping",
	completed: "completed",
	canceled: "canceled",
};

const listStatus = [
	{
		key: "all",
		title: "Tất cả",
		engTitle: "All",
	},
	{
		key: "notProcessed",
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
		title: "hoàn thành",
		engTitle: "Completed",
	},
	{
		key: "canceled",
		title: "Bị hủy",
		engTitle: "Canceled",
	},
];
export { status, listStatus };
