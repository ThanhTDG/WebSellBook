import { constants } from "~/stores";

export const productToID = (product) => {
	let newProduct = {
		...product,
		id: product._id,
	};
	return newProduct;
};
export const convertTreeObject = (array = []) => {
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
			return newItem;
		});
	} else {
		return;
	}
};
export const convertTree = (list = [], maxLevel = 3) => {
	let result = [];
	if (list.length === 0) return [];
	let currentLevel = 0;
	const addList = (item, array, currentLevel, maxLevel) => {
		if (currentLevel > maxLevel) return;
		currentLevel += 1;
		let children = array.filter((child) => child.parent && child.parent.id === item.id);
		if (children.length > 0) {
			children = children.map((child) => addList(child, array, currentLevel, maxLevel));
		}
		return {
			...item,
			children: children,
			level: currentLevel,
		};
	};
	result = list.filter((item) => !item.parent);
	result = result.map((item) => addList(item, list, currentLevel, maxLevel));
	return result;
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
export const convertToSearch = (str) => {
	if (!str) return;
	str = str.toLowerCase();
	str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
	str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
	str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
	str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
	str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
	str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
	str = str.replace(/đ/g, "d");
	str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
	str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
	str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
	str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
	str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
	str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
	str = str.replace(/Đ/g, "D");
	// Some system encode vietnamese combining accent as individual utf-8 characters
	// Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
	str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
	str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
	// Remove extra spaces
	str = str.replace(/ + /g, " ");
	str = str.trim();
	str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
	return str;
};
export const convertSexToString = (sex) => {
	if (sex) return constants.MALE;
	else return constants.FE_MALE;
};
