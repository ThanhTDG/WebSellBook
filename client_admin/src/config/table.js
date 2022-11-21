const table = {
	book: {
		headers: [
			{
				key: "name",
				align: "left",
				title: "Tên",
				engTitle: "Name product",
			},
			{
				key: "countOfStock",
				align: "right",
				title: "Tồn kho",
				engTitle: "Count Of Stock",
			},
			{
				key: "price",
				align: "right",
				title: "Giá bán",
				engTitle: "Price",
			},
			{
				key: "sold",
				align: "right",
				title: "Đã bán",
				engTitle: "Sold",
			},
			{
				key: "status",
				align: "right",
				title: "Trạng thái",
				engTitle: "Status",
			},
		],
	},
};
const limitRowsBook = {
	title: "Số trang",
	options: [25, 50, 100],
};

export { table, limitRowsBook };
