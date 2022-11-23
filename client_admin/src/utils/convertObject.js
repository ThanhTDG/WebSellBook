export const productToID = (product) => {
	let newProduct = {
		...product,
		id: product._id,
	};
	return newProduct;
};
export const convertTreeObject = (array = []) => {
	console.log("mangr", array);
	if (array || array.length > 0) {
		return array.map((item) => {
			let children = convertTreeObject(item.children);
			let newItem = {
				value: item.name,
				title: item.name,
				...item,
			};
			if (children && children.length > 0) {
				newItem.children = children;
			} else if (newItem.children) {
				delete newItem.children;
			}
			console.log("newItem", newItem);
			return newItem;
		});
	} else {
		return;
	}
};
export const convertToSlug = (str) => {
	// Chuyển hết sang chữ thường
	str = str.toLowerCase();

	// xóa dấu
	str = str
		.normalize("NFD") // chuyển chuỗi sang unicode tổ hợp
		.replace(/[\u0300-\u036f]/g, ""); // xóa các ký tự dấu sau khi tách tổ hợp

	// Thay ký tự đĐ
	str = str.replace(/[đĐ]/g, "d");

	str = str.replace(/[&]/g, "and");

	// Xóa ký tự đặc biệt
	str = str.replace(/([^0-9a-z-\s])/g, "");

	// Xóa khoảng trắng thay bằng ký tự -
	str = str.replace(/(\s+)/g, "-");
	///

	// Xóa ký tự - liên tiếp
	str = str.replace(/-+/g, "-");

	// xóa phần dư - ở đầu & cuối
	str = str.replace(/^-+|-+$/g, "");

	// return
	return str;
};
