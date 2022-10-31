import Home from "~/pages/home/Home";
import Products from "~/pages/list/products/Products";
// Public routes
const publicRoutes = [];
const privateRoutes = [
	{ path: "/", component: Home },
	{ path: "/products", component: Products },
];

export { publicRoutes, privateRoutes };
