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

export const setSortTable = (payload) => ({
	type: constants.SET_SORT_TABLE,
	payload,
});
export const setFilterTable = (payload) => ({
	type: constants.SET_FILTER_TABLE,
	payload,
});

export const setPageTable = (payload) => ({
	type: constants.SET_PAGE_TABLE,
	payload,
});
export const setStatusTable = (payload) => ({
	type: constants.SET_STATUS_TABLE,
	payload,
});

export const setNewPropTable = (payload) => ({
	type: constants.SET_NEW_PROP_TABLE,
	payload,
});

export const setTypeSearchTable = (payload) => ({
	type: constants.SET_TYPE_SEARCH_TABLE,
	payload,
});
export const setSearchTable = (payload) => ({
	type: constants.SET_SEARCH_TABLE,
	payload,
});
export const setCategoryTable = (payload) => ({
	type: constants.SET_CATEGORY_TABLE,
	payload,
});

/// global state

export const setIsLogin = (payload) => ({
	type: constants.SET_IS_LOGIN,
	payload,
});

/// categories
export const setTreeCategories = (payload) => ({
	type: constants.SET_TREE_CATEGORIES,
	payload,
});
export const setListCategories = (payload) => ({
	type: constants.SET_LIST_CATEGORIES,
	payload,
});
export const setCategories = (payload) => ({
	type: constants.SET_CATEGORIES,
	payload,
});
export const setNeedUpdate = (payload) => ({
	type: constants.SET_NEED_UPDATE,
	payload,
});
/// edit mode
export const setEnableEdit = (payload) => ({
	type: constants.SET_ENABLE_EDIT,
	payload,
});
export const setIsChangeNEdit = (payload) => ({
	type: constants.SET_IS_CHANGE_EDIT,
	payload,
});
export const setIsNew = (payload) => ({
	type: constants.SET_IS_NEW,
	payload,
});
export const setIsChange = (payload) => ({
	type: constants.SET_IS_CHANGE,
	payload,
});
export const setValueChange = (payload) => ({
	type: constants.SET_VALUE_CHANGE,
	payload,
});
export const setResetAll = (payload) => ({
	type: constants.SET_RESET_ALL,
	payload,
});
export const setValue = (payload) => ({
	type: constants.SET_VALUE,
	payload,
});

export const setStatusLoad = (payload) => ({
	type: constants.SET_STATUS_LOAD,
	payload,
});
export const setStatusIsLoading = (payload) => ({
	type: constants.SET_STATUS_IS_LOADING,
	payload,
});
export const setStatusIsSuccess = (payload) => ({
	type: constants.SET_STATUS_IS_SUCCESS,
	payload,
});

export const setStatusIsError = (payload) => ({
	type: constants.SET_STATUS_IS_ERROR,
	payload,
});
