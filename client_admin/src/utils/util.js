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

export { getKey, convertToTree };
