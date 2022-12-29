import Home from "~/pages/Home";
import NewProduct from "~/pages/Product/CreateProduct";
import Products from "~/pages/Products";
import TestLayout from "~/pages/test/TestLayout";
import CustomersPage from "~/pages/UserAccount/CustomersPage";
import ViewProduct from "~/pages/Product/ViewProduct/ViewProduct";
import LoginPage from "~/pages/Auth/LoginPage/LoginPage";
import RolePage from "~/pages/RolePage";
import CategoriesPage from "~/pages/CategoriesPage";
import AccountAdminPage from "~/pages/UserAccount/AccountAdminPage";
import CustomerPage from "~/pages/UserAccount/CustomerPage";

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

	/// categories
	categories: {
		key: "categories",
		route: "/categories",
		label: "Quản lý danh mục",
		component: CategoriesPage,
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
	accountAdmin: {
		key: "accountAdmin",
		route: "/account/admin/:id",
		label: "Tài khoản quản trị",
		component: AccountAdminPage,
	},

	customers: {
		key: "user-customer",
		route: "/customers",
		label: "Quản lý tài khoản khách hàng",
		component: CustomersPage,
	},
	customer: {
		key: "customer",
		route: "/customer/:id",
		label: "Tài khoản khách hàng",
		component: CustomerPage,
	},
	/// order
	order: {
		key: "order",
		route: "/order@:id",
		label: "Đơn hàng",
		component: TestLayout,
	},

	/// role
	role: {
		key: "role",
		route: "/role",
		label: "Vai trò",
		component: RolePage,
	},
	test: {
		key: "test",
		route: "/test",
		label: "Thử nghiệm",
		component: TestLayout,
	},
};

export default PageConfig;
