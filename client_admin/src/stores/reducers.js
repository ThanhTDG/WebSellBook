import * as constants from "~/stores/constants";
import * as initStates from "~/stores/initStates";
import loadStatus, { messageStatus } from "./statusLoad";
export const globalStateReducer = (state, action) => {
	switch (action.type) {
		case constants.SET_IS_LOGIN: {
			return {
				...state,
				isLogin: action.payload,
			};
		}
		case constants.SET_LOGIN_N_INFO: {
			let { profile, permission } = action.payload;
			return {
				...state,
				isLogin: true,
				profile: profile,
				permission: permission,
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
			let { isChange, value } = action.payload;
			return {
				...state,
				isChange: isChange,
				value: value,
			};
		case constants.SET_NEW_VALUE:
			return {
				...state,
				isNew: true,
				value: action.payload,
			};
		case constants.SET_RESET_ALL:
			return {
				...initStates.editModeState,
			};
		case constants.SET_STATUS_LOAD:
			return {
				...initStates.editModeState,
				statusLoad: action.payload,
			};
		case constants.SET_IS_CHANGE_EDIT:
			return {
				...state,
				enableEdit: true,
				isChange: true,
			};
		case constants.SET_STATUS_IS_LOADING:
			return {
				...state,
				statusLoad: loadStatus.loading,
				messageStatus: action.payload,
			};
		case constants.SET_STATUS_IS_SUCCESS:
			return {
				...initStates.editModeState,
				statusLoad: loadStatus.success,
				messageStatus: action.payload,
			};
		case constants.SET_STATUS_IS_ERROR:
			return {
				...initStates.editModeState,
				statusLoad: loadStatus.error,
				messageStatus: action.payload,
			};
		case constants.SET_NEED_UPDATE:
			let { needUpdate, valueUpdate } = action.payload;
			return {
				...initStates.editModeState,
				value: valueUpdate,
				isNeedUpdate: needUpdate,
			};
		default:
			throw new Error("invalid action");
	}
}
