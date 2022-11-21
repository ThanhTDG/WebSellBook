import Home from "~/pages/Home";
import NewProduct from "~/pages/NewProduct";
import Products from "~/pages/Products";
import TestLayout from "~/pages/test/TestLayout";

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
		component: NewProduct,
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
