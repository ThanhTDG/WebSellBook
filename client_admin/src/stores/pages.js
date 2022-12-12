import Home from "~/pages/Home";
import NewProduct from "~/pages/Product/NewProduct";
import Products from "~/pages/Products";
import TestLayout from "~/pages/test/TestLayout";
import CustomerPage from "~/pages/CustomerPage";
import ViewProduct from "~/pages/Product/ViewProduct/ViewProduct";
import LoginPage from "~/pages/Auth/LoginPage/LoginPage";

const PageConfig = {
	home: {
		key: "home",
		route: "/",
		label: "Trang chủ",
		component: Home,
	},
	dashboard: {
		key: "dashboard",
		route: "/",
		label: "Bảng điều khiển",
		component: Home,
	},
	/// auth
	login: {
		key: "login",
		route: "/login",
		label: "Trang đăng nhập",
		component: LoginPage,
	},

	// mgt product
	products: {
		key: "products",
		route: "/products",
		label: "Quản lý sản phẩm",
		component: Products,
	},
	newProduct: {
		key: "newProduct",
		route: "/products/new",
		label: "Thêm sản phẩm",
		component: NewProduct,
	},
	product: {
		key: "product",
		route: "/product/:id",
		label: "Sản phẩm",
		component: ViewProduct,
	},
	// mgt users

	// mgt customer
	customer: {
		key: "customer",
		route: "/customer",
		label: "Quản lý khách hàng",
		component: CustomerPage,
	},

	orders: {
		key: "orders",
		route: "/orders",
		label: "Quản lý đơn hàng",
		component: TestLayout,
	},
	order: {
		key: "order",
		route: "/order@:id",
		label: "Đơn hàng",
		component: TestLayout,
	},
	test: {
		key: "test",
		route: "/test",
		label: "Thử nghiệm",
		component: TestLayout,
	},
};

export default PageConfig;
