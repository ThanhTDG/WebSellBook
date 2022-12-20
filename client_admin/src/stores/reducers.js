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
export function CategoriesReduce(state, action) {
	switch (action.type) {
		case constants.SET_TREE_CATEGORIES:
			return {
				...state,
				tree: action.payload,
			};
		case constants.SET_LIST_CATEGORIES:
			return {
				...state,
				list: action.payload,
			};
		case constants.SET_CATEGORIES:
			const [tree, list] = action.payload;
			return {
				...state,
				tree: tree,
				list: list,
			};
		case constants.SET_NEED_UPDATE:
			return {
				...state,
				isUpdate: action.payload,
			};
		default:
			throw new Error("valid action");
	}
}
export function EditModeReducer(state, action) {
	console.log(action.type, state, action);
	switch (action.type) {
		case constants.SET_ENABLE_EDIT:
			return {
				...state,
				isNew: false,
				enableEdit: action.payload,
			};
		case constants.SET_IS_NEW:
			return {
				...state,
				enableEdit: false,
				isNew: action.payload,
			};
		case constants.SET_IS_CHANGE:
			return {
				...state,
				isChange: action.payload,
			};
		case constants.SET_VALUE_CHANGE:
			return {
				...state,
				value: action.payload,
			};
		case constants.SET_NEW_VALUE:
			return {
				...state,
				isNew: true,
				value: { ...action.payload },
			};
		default:
			throw new Error("invalid action");
	}
}
