import * as constants from "~/stores/constants";

export const globalStateReducer = (state, action) => {
	console.log("global reducer", action.payload);
	switch (action.type) {
		case constants.SET_IS_LOGIN: {
			return {
				...state,
				isLogin: action.payload,
			};
		}
	}
};

export function TabTableReduce(state, action) {
	switch (action.type) {
		case constants.SET_LIMIT_ROWS:
			return {
				...state,
				page: 1,
				limit: action.payload,
			};
		case constants.SET_STATUS_TABLE:
			let status = action.payload;
			return {
				...state,
				...status,
			};
		case constants.SET_TYPE_SEARCH_TABLE:
			return {
				...state,
				typeSearch: action.payload,
			};
		case constants.SET_SEARCH_TABLE:
			return {
				...state,
				search: action.payload,
			};
		case constants.SET_CATEGORY_TABLE:
			return {
				...state,
				category: action.payload,
			};
		case constants.SET_FILTER_TABLE:
			let filter = action.payload;
			return {
				...state,
				...filter,
			};
		case constants.SET_PAGE_TABLE:
			return {
				...state,
				page: action.payload,
			};
		case constants.SET_NEW_PROP_TABLE:
			let newProp = action.payload;
			return {
				...state,
				...newProp,
			};
		default:
			throw new Error("valid action");
	}
}
