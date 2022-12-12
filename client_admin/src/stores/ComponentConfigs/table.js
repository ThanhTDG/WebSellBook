const table = {
	book: {
		name: {
			key: "name",
			align: "left",
			title: "Tên",
			engTitle: "Name product",
		},
		countOfStock: {
			key: "countOfStock",
			align: "right",
			title: "Tồn kho",
			engTitle: "Count Of Stock",
		},
		sold: {
			key: "sold",
			align: "right",
			title: "Đã bán",
			engTitle: "Sold",
		},
		price: {
			key: "price",
			align: "right",
			title: "Giá bán",
			engTitle: "Price",
		},
		status: {
			key: "status",
			align: "right",
			title: "Trạng thái",
			engTitle: "Status",
		},
	},
	customer: {
		name: {
			key: "name",
			align: "left",
			title: "Tên",
			engTitle: "Name",
		},
		email: {
			key: "email",
			align: "left",
			title: "Email",
			engTitle: "Email",
		},

		phone: {
			key: "phone",
			align: "right",
			title: "Số điện thoại",
			engTitle: "Phone Number",
		},
		status: {
			key: "status",
			align: "right",
			title: "Trạng thái",
			engTitle: "Status",
		},
	},
};
const limitRow = {
	title: "Số dòng",
	options: [25, 50, 100],
};

export { table, limitRow };
