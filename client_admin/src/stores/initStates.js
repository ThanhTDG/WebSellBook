import { FastRewind } from "@mui/icons-material";
import { constants } from ".";
import BookConfig from "./Book";
import { limitRow } from "./ComponentConfigs/table";
import CustomerConfig from "./Customer";
export const products = {
	indexStatus: 0,
	status: BookConfig.listStatus[0].key,
	page: 1,
	limit: limitRow.options[0],
	totalPages: 10,
};
export const filterProduct = {
	typeSearch: BookConfig.options.typeSearch.value[0].id,
	category: "",
	search: "",
	sort: "",
};
export const customer = {
	indexStatus: 0,
	status: CustomerConfig.listStatus[0].key,
	page: 1,
	limit: limitRow.options[0],
	totalPages: 10,
};
export const filterCustomer = {
	typeSearch: CustomerConfig.options.typeSearch.value[0].id,
	category: "",
	search: "",
	sort: "",
};
export const globalState = {
	isLogin: false,
};
export const categoriesState = {
	isUpdate: false,
	list: [],
	tree: [],
};
export const editState = {
	isNew: false,
	isEdit: false,
};
export const newRole = {
	id: null,
	name: constants.NEW_ROLE_NAME,
	description: "",
	permissions: [],
	createdDate: "",
	updatedDate: "",
};
export const role = {
	all: {
		all: {
			enable: false,
		},
		create: {
			enable: false,
		},
		view: {
			enable: false,
		},
		update: {
			enable: false,
		},
		delete: {
			enable: false,
		},
		statistic: {
			enable: false,
		},
	},
	category: {
		all: {
			enable: false,
		},
		create: {
			enable: false,
		},
		view: {
			enable: false,
		},
		update: {
			enable: false,
		},
		delete: {
			enable: false,
		},
		statistic: {
			enable: false,
		},
	},
	product: {
		all: {
			enable: false,
		},
		create: {
			enable: false,
		},
		view: {
			enable: false,
		},
		update: {
			enable: false,
		},
		delete: {
			enable: false,
		},
		statistic: {
			enable: false,
		},
	},
	order: {
		all: {
			enable: false,
		},
		create: {
			enable: false,
		},
		view: {
			enable: false,
		},
		update: {
			enable: false,
		},
		delete: {
			enable: false,
		},
		statistic: {
			enable: false,
		},
	},
	role: {
		all: {
			enable: false,
		},
		create: {
			enable: false,
		},
		view: {
			enable: false,
		},
		update: {
			enable: false,
		},
		delete: {
			enable: false,
		},
		statistic: {
			enable: false,
		},
	},
	admin: {
		all: {
			enable: false,
		},
		create: {
			enable: false,
		},
		view: {
			enable: false,
		},
		update: {
			enable: false,
		},
		delete: {
			enable: false,
		},
		statistic: {
			enable: false,
		},
	},
	customer: {
		all: {
			enable: false,
		},
		create: {
			enable: false,
		},
		view: {
			enable: false,
		},
		update: {
			enable: false,
		},
		delete: {
			enable: false,
		},
		statistic: {
			enable: false,
		},
	},
	user: {
		all: {
			enable: false,
		},
		create: {
			enable: false,
		},
		view: {
			enable: false,
		},
		update: {
			enable: false,
		},
		delete: {
			enable: false,
		},
		statistic: {
			enable: false,
		},
	},
};
