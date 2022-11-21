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
