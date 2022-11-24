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
				key: "sold",
				align: "right",
				title: "Đã bán",
				engTitle: "Sold",
			},
			{
				key: "price",
				align: "right",
				title: "Giá bán",
				engTitle: "Price",
			},
			{
				key: "status",
				align: "right",
				title: "Trạng thái",
				engTitle: "Status",
			},
		],
	},
	customer: {
		headers: [
			{
				key: "name",
				align: "left",
				title: "Tên",
				engTitle: "Name",
			},
			{
				key: "email",
				align: "left",
				title: "Email",
				engTitle: "Email",
			},

			{
				key: "phone",
				align: "right",
				title: "Số điện thoại",
				engTitle: "Phone Number",
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
const limitRow = {
	title: "Số dòng",
	options: [25, 50, 100],
};

export { table, limitRow };
