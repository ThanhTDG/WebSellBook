import { CatchingPokemonSharp } from "@mui/icons-material";
import dayjs from "dayjs";
import { constants } from "~/stores";
import { category } from "~/stores/initStates";
import PageConfig from "~/stores/pages";
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
	let children = array.filter((child) => child.parent && child.parent.id === category.id);
	if (children.length > 0) {
		deep++;
		let haveChild = false;
		children.map((child) => {
			let list = array.filter((item) => item.parent && item.parent.id === child.id);
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

export const displayDay = (dateString) => {
	if (!dateString) return "";
	const dayConvert = dayjs(dateString).format("HH:mm DD/MM/YYYY");
	return dayConvert;
};

export { getKey, convertToTree };
