import Home from "~/pages/Home";
import { default as routesConfig } from "~/config/routes";
import Products from "~/pages/Products";
import TestLayout from "~/layouts/test/TestLayout";
// Public routes
const publicRoutes = [];
const privateRoutes = [
	{ path: routesConfig.home, component: Home },
	{ path: routesConfig.products, component: Products },
	{ path: routesConfig.test, component: TestLayout, layout: null },
];

export { publicRoutes, privateRoutes };
