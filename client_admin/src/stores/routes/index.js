import PageConfig from "~/stores/pages";

// Public routes
const publicRoutes = [{ path: PageConfig.login.route, component: PageConfig.login.component, layout: null }];
const privateRoutes = [
	{ path: PageConfig.home.route, component: PageConfig.home.component },
	/// product
	{ path: PageConfig.products.route, component: PageConfig.products.component },
	{ path: PageConfig.product.route, component: PageConfig.product.component },
	{ path: PageConfig.newProduct.route, component: PageConfig.newProduct.component },

	/// categories
	{ path: PageConfig.categories.route, component: PageConfig.categories.component },

	/// customer
	{ path: PageConfig.customer.route, component: PageConfig.customer.component },

	/// role
	{ path: PageConfig.role.route, component: PageConfig.role.component },

	{ path: PageConfig.test.route, component: PageConfig.test.component, layout: null },
];

export { publicRoutes, privateRoutes };
