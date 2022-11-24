const typeSearch = {
	name: "Tìm theo",
	value: [
		{ id: "name", name: "Tên khách hàng" },
		{ id: "email", name: "emal" },
		{ id: "phone", name: "Số điện thoại" },
	],
};
const typeSort = {
	name: "sắp xếp",
	value: [
		{ id: "a-z-name", name: "a->z Tên" },
		{ id: "z-a-name", name: "z->a Tên" },
		{ id: "a-z-price", name: "a->z Giá" },
		{ id: "z-a-price", name: "z->a Giá" },
		{ id: "a-z-countInStock", name: "a->z Tồn kho" },
		{ id: "z-a-countInStock", name: "z->a Tồn kho" },
		{ id: "a-z-sold", name: "a->z Đã bán" },
		{ id: "z-a-sold", name: "z->a Đã bán" },
	],
};
export { typeSearch, typeSort };
