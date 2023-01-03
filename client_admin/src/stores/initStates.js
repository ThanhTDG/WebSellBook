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
export const receipts = {
	indexStatus: 1,
	status: BookConfig.listStatus[0].key,
	page: 1,
	limit: limitRow.options[0],
	totalPages: 10,
};
export const admins = {
	indexStatus: 0,
	status: BookConfig.listStatus[0].key,
	page: 1,
	limit: limitRow.options[0],
	totalPages: 10,
};
export const filterAdmins = {
	typeSearch: CustomerConfig.options.typeSearch.value[0].id,
	search: "",
	sort: "",
};
export const product = {};
export const filterProduct = {
	typeSearch: BookConfig.options.typeSearch.value[0].id,
	category: "",
	search: "",
	sort: "",
};
export const filterOrder = {
	typeSearch: BookConfig.options.typeSearch.value[0].id,
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
	userPermissions: [],
	permissions: {
		list: [],
		actions: [],
		subjects: [],
	},
	profile: {},
};
export const categoriesState = {
	isUpdate: false,
	isChange: false,
	category: {},
	list: [],
	tree: [],
};
export const editModeState = {
	enableEdit: false,
	isChange: false,
	isNew: false,
	statusLoad: "",
	statusMessage: "",
};
export const openCategory = {
	isOpen: false,
	newId: null,
};
export const category = {
	id: "",
	name: "",
	level: constants.MAX_LEVEL,
};
export const role = {
	id: null,
	name: constants.NEW_ROLE_NAME,
	description: "",
	permissions: [],
};
export const permissions = {
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
