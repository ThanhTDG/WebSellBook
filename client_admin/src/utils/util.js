import { CatchingPokemonSharp } from "@mui/icons-material";
import dayjs from "dayjs";
import { constants } from "~/stores";
import { category } from "~/stores/initStates";
import PageConfig from "~/stores/pages";
import products from "./fake";
const getKey = (keyFind, value) => {
	let key = "";
	Object.keys(PageConfig).forEach((page) => {
		if (PageConfig[page][keyFind] === value) {
			key = page;
			return;
		}
	});
	return key;
};

const convertToTree = (data) => {
	const createTree = (object, data) => {
		let children = data.filter((e) => e.parent === object._id);
		if (children && children.length !== 0) {
			object.children = children;
			object.children.forEach((item) => {
				createTree(item, data);
			});
		} else {
			return;
		}
	};
	let tree = [];
	data.map((item) => {
		if (!("parent" in item)) {
			tree.push(item);
		}
	});
	tree.forEach((item) => {
		createTree(item, data);
	});
	return tree;
};
export const copyObject = (source) => {
	return JSON.parse(JSON.stringify(source));
};
export const deepCategory = (category, array) => {
	if (!category) {
		return;
	}
	if (category.level === constants.MAX_LEVEL) return 0;
	let list = [];
	list.push(category);
	let deep = 0;
	let children = array.filter(
		(child) => child.parent && child.parent.id === category.id
	);
	if (children.length > 0) {
		deep++;
		let haveChild = false;
		children.map((child) => {
			let list = array.filter(
				(item) => item.parent && item.parent.id === child.id
			);
			if (list.length > 0) {
				haveChild = true;
			}
		});
		if (haveChild) {
			deep++;
		}
	}
	return deep;
};

export function dataURLtoFile(dataurl, filename) {
	var arr = dataurl.split(","),
		mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]),
		n = bstr.length,
		u8arr = new Uint8Array(n);

	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}

	return new File([u8arr], filename, { type: mime });
}
export const fakeSellBook = () => {
	let i = 1;
	let list = products.slice(0, 10).map((item) => {
		i += 2;
		return {
			id: item.id,
			name: item.name,
			sold: item.sold - i,
		};
	});
	let labels = list.map((item) => {
		return `${item.name.slice(0, 25)}${item.name.length > 25 ? "..." : ""}`;
	});
	let dataSet = list.map((item) => {
		return item.sold;
	});
	console.log(labels, dataSet);
};
export { getKey, convertToTree };
