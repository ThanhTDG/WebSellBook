import OnlyNavLayout from "~/layouts/OnlyNavLayout";
import PageConfig from "~/stores/pages";

// Public routes
const publicRoutes = [{ path: PageConfig.login.route, component: PageConfig.login.component, layout: null }];
const privateRoutes = [
	{ path: PageConfig.home.route, component: PageConfig.home.component },
	/// product
	{ path: PageConfig.products.route, component: PageConfig.products.component, layout: OnlyNavLayout },
	{ path: PageConfig.product.route, component: PageConfig.product.component, layout: OnlyNavLayout },
	{ path: PageConfig.newProduct.route, component: PageConfig.newProduct.component, layout: OnlyNavLayout },

	/// categories
	{ path: PageConfig.categories.route, component: PageConfig.categories.component, layout: OnlyNavLayout },

	/// customer
	{ path: PageConfig.customer.route, component: PageConfig.customer.component },

	/// role
	{ path: PageConfig.role.route, component: PageConfig.role.component, layout: OnlyNavLayout },

	{ path: PageConfig.test.route, component: PageConfig.test.component, layout: OnlyNavLayout },
];

export { publicRoutes, privateRoutes };
