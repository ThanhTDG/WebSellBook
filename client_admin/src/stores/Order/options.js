const typeSearch = {
	name: "Tìm theo",
	value: [
		{ id: "orderCode", name: "Mã đơn hàng" },
		{ id: "email", name: "email" },
		{ id: "phone", name: "Số điện thoại" },
	],
};
const typeSort = {
	name: "sắp xếp",
	value: [
		{ id: "a-z-date", name: "a->z ngày" },
		{ id: "a-z-date", name: "z->a ngày" },
		{ id: "z-a-price", name: "z->a giá trị đơn hàng" },
		{ id: "a-z-price", name: "a->z giá trị đơn hàng" },
	],
};
export { typeSearch, typeSort };
