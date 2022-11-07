import PageConfig from "~/config/pages";
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

export { getKey };
