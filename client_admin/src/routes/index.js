import Home from "~/pages/Home";
// Public routes
const publicRoutes = [];
const privateRoutes = [
	{ path: "/", component: Home },
];

export { publicRoutes, privateRoutes };
