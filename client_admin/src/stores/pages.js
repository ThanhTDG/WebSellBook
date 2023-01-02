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
import ReceiptsPage from "~/pages/Receipt/ReceiptsPage";
import ProfilePage from "~/pages/Auth/ProfilePage/ProfilePage";
import AccountAdminsPage from "~/pages/UserAccount/AccountAdminsPage";
import ReceiptPage from "~/pages/Receipt/ReceiptPage";

const PageConfig = {
	home: {
		key: "home",
		route: "/",
		label: "Trang chủ",
		component: Home,
	},
	otherHome: {
		key: "home",
		route: "/home",
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
	profile: {
		key: "profile",
		route: "/profile",
		label: "Thông cá nhân",
		component: ProfilePage,
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
	accountAdmins: {
		key: "accountAdmins",
		route: "/account/admins",
		label: "Quản lý tài khoản quản trị",
		component: AccountAdminsPage,
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
	receipts: {
		key: "receipts",
		route: "/receipts",
		label: "Quản lý đơn hàng",
		component: ReceiptsPage,
	},
	/// order
	receipt: {
		key: "receipt",
		route: "/receipt/:id",
		label: "Đơn hàng",
		component: ReceiptPage,
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
