const status = {
	all: "",
	comingSoon: "coming_soon", // sắp ra mắt
	available: "available", // còn hàng
	outOfStock: "out_of_stock", // hết hàng
	disable: "canceled",
};

const listBookStatus = [
	{
		key: "all",
		title: "Tất cả",
		engTitle: "All",
	},
	{
		key: "available",
		title: "Đang bán",
		engTitle: "Available",
	},
	{
		key: "comingSoon",
		title: "Sắp ra mắt",
		engTitle: "Coming soon",
	},
	{
		key: "outOfStock",
		title: "Hết hàng",
		engTitle: "Out of stock",
	},
	{
		key: "disable",
		title: "Đã tắt",
		engTitle: "Disable",
	},
];
export { status, listBookStatus };
