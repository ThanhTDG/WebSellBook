import OnlyNavLayout from "~/layouts/OnlyNavLayout";
import PageConfig from "~/stores/pages";

// Public routes
const publicRoutes = [
	{
		path: PageConfig.login.route,
		component: PageConfig.login.component,
		layout: null,
	},
];
const privateRoutes = [
	{ path: PageConfig.home.route, component: PageConfig.home.component },
	{
		path: PageConfig.otherHome.route,
		component: PageConfig.otherHome.component,
	},
	/// product
	{
		path: PageConfig.products.route,
		component: PageConfig.products.component,
		layout: OnlyNavLayout,
	},
	{
		path: PageConfig.logout.route,
		component: PageConfig.logout.component,
		layout: OnlyNavLayout,
	},
	{
		path: PageConfig.product.route,
		component: PageConfig.product.component,
		layout: OnlyNavLayout,
	},
	{
		path: PageConfig.newProduct.route,
		component: PageConfig.newProduct.component,
		layout: OnlyNavLayout,
	},

	/// categories
	{
		path: PageConfig.categories.route,
		component: PageConfig.categories.component,
		layout: OnlyNavLayout,
	},
	/// account
	{
		path: PageConfig.profile.route,
		component: PageConfig.profile.component,
		layout: OnlyNavLayout,
	},

	/// account
	{
		path: PageConfig.accountAdmins.route,
		component: PageConfig.accountAdmins.component,
		layout: OnlyNavLayout,
	},
	{
		path: PageConfig.accountAdmin.route,
		component: PageConfig.accountAdmin.component,
		layout: OnlyNavLayout,
	},
	{
		path: PageConfig.customers.route,
		component: PageConfig.customers.component,
		layout: OnlyNavLayout,
	},
	{
		path: PageConfig.customer.route,
		component: PageConfig.customer.component,
		layout: OnlyNavLayout,
	},

	//
	{
		path: PageConfig.receipts.route,
		component: PageConfig.receipts.component,
		layout: OnlyNavLayout,
	},
	{
		path: PageConfig.receipt.route,
		component: PageConfig.receipt.component,
		layout: OnlyNavLayout,
	},

	/// role
	{
		path: PageConfig.role.route,
		component: PageConfig.role.component,
		layout: OnlyNavLayout,
	},
	{
		path: PageConfig.test.route,
		component: PageConfig.test.component,
		layout: OnlyNavLayout,
	},
];

export { publicRoutes, privateRoutes };
