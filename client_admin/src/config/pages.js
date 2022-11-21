import Home from "~/pages/Home";
import NewProduct from "~/pages/NewProduct";
import Products from "~/pages/Products";
import TestLayout from "~/pages/test/TestLayout";

const PageConfig = {
	home: {
		key: "home",
		route: "/",
		title: "Trang chủ",
		component: Home,
	},
	// mgt product
	products: {
		key: "products",
		route: "/products",
		title: "Quản lý sản phẩm",
		component: Products,
	},
	newProduct: {
		key: "newProduct",
		route: "/products/new",
		title: "Thêm sản phẩm",
		component: NewProduct,
	},
	product: {
		key: "product",
		route: "/product/:id",
		title: "Sản phẩm",
		component: NewProduct,
	},
	orders: {
		key: "orders",
		route: "/orders",
		title: "Quản lý đơn hàng",
		component: TestLayout,
	},
	order: {
		key: "order",
		route: "/order@:id",
		title: "Đơn hàng",
		component: TestLayout,
	},
	test: {
		key: "test",
		route: "/test",
		title: "Thử nghiệm",
		component: TestLayout,
	},
};

export default PageConfig;
