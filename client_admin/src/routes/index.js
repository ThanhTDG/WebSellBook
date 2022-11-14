import PageConfig from "~/config/pages";

// Public routes
const publicRoutes = [];
const privateRoutes = [
	{ path: PageConfig.home.route, component: PageConfig.home.component },
	{ path: PageConfig.products.route, component: PageConfig.product.component },
	{ path: PageConfig.newProduct.route, component: PageConfig.newProduct.component },
	{ path: PageConfig.test.route, component: PageConfig.test.component, layout: null },
];

export { publicRoutes, privateRoutes };
