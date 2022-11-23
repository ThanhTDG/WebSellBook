import * as constants from "./constants";

export const setTabMgtProduct = (payload) => ({
	type: constants.SET_TAB_MGT_PRODUCT,
	payload,
});

export const setPageMgtProduct = (payload) => ({
	type: constants.SET_PAGE_MGT_PRODUCT,
	payload,
});

export const setLimitRow = (payload) => ({
	type: constants.SET_LIMIT_ROWS,
	payload,
});
export const setPageProducts = (payload) => ({
	type: constants.SET_PAGE_PRODUCTS,
	payload,
});
export const setStatusProducts = (payload) => ({
	type: constants.SET_STATUS_PRODUCTS,
	payload,
});

export const setNewPropProducts = (payload) => ({
	type: constants.SET_NEW_PROP_PRODUCTS,
	payload,
});

export const setTypeSearchProducts = (payload) => ({
	type: constants.SET_TYPE_SEARCH_PRODUCTS,
	payload,
});
export const setSearchProducts = (payload) => ({
	type: constants.SET_SEARCH_PRODUCTS,
	payload,
});
export const setCategoryProducts = (payload) => ({
	type: constants.SET_CATEGORY_PRODUCTS,
	payload,
});

export const setSortProducts = (payload) => ({
	type: constants.SET_SORT_PRODUCTS,
	payload,
});
export const setFilterProducts = (payload) => ({
	type: constants.SET_FILTER_PRODUCTS,
	payload,
});
