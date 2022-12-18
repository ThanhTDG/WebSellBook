import { CatchingPokemonSharp } from "@mui/icons-material";
import dayjs from "dayjs";
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
export const FindLevelNode = (id, array) => {
	let data = {
		value: "",
	};
	const dfs = (node, id, data) => {
		if (node.id === id) {
			data.value = { ...node };
			return;
		}
		if (node.children && node.children.length > 0) {
			node.children.forEach((child) => {
				dfs(child, id, data);
			}, data);
		}
	};
	array.forEach((node) => {
		dfs(node, id, data);
	}, data);
	const node = { ...data.value };
	if (node.children && node.children.length > 0) {
		let deep = 1;
		let addDeep = false;
		node.children.map((child) => {
			if (child.children && child.children.length > 0) {
				addDeep = true;
				return;
			}
		});
		if (addDeep) {
			return deep + 1;
		} else {
			return deep;
		}
	} else {
		return 0;
	}
};
export const renderTreeLevel = (data, maxLevel) => {
	if (maxLevel === 0) return [];
	const dfs = (node, currentLevel, maxLevel) => {
		if (currentLevel === maxLevel) {
			if (node.children && node.children.length > 0) {
				delete node.children;
			}
			return;
		} else if (maxLevel < currentLevel) {
			node = [];
			data = [];
			return;
		}
		{
			if (node.children && node.children.length > 0) {
				node.children.forEach((child) => {
					dfs(child, currentLevel + 1, maxLevel);
				});
			}
		}
	};
	data.forEach((node) => {
		let i = 1;
		dfs(node, i, maxLevel);
	});
	return data;
};
export const displayDay = (dateString) => {
	if (!dateString) return "";
	const dayConvert = dayjs(dateString).format("HH:mm DD/MM/YYYY");
	return dayConvert;
};

export { getKey, convertToTree };
