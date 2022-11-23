import { Link } from "react-router-dom";
import { icons } from "~/assets/images";
import { default as PageConfig } from "~/config/pages";
const sidebar = [
	{
		key: "home",
		label: <Link to={PageConfig.home.route}>Trang chủ</Link>,
		icon: icons.Sidebar("icon").home,
	},
	{
		key: "list",
		label: "Danh sách",
		icon: icons.Sidebar("icon").list,
		children: [
			{
				key: PageConfig.products.key,
				label: <Link to={PageConfig.products.route}>Sản phẩm</Link>,
				icon: icons.Sidebar("icon").products,
			},
			{
				key: PageConfig.customer.key,
				label: <Link to={PageConfig.customer.route}>Khách hàng</Link>,
				icon: icons.Sidebar("icon").customer,
			},
			{
				link: "/orders",
				key: "orders",
				name: "Orders",
			},
			{
				link: "/users",
				key: "users",
				name: "Users",
			},
			{
				link: "/delivery",
				key: "delivery",
				name: "Delivery",
			},
		],
	},
	{
		label: "Useful",
	},
	{
		label: "Service",
		children: [
			{
				link: "/system_health",
				key: "system_health",
				name: "System health",
			},
			{
				link: "/logs",
				key: "logs",
				name: "Logs",
			},
		],
	},
	{
		label: "USER",
		children: [
			{
				link: "/profile",
				key: "profile",
				name: "Profile",
			},
			{
				link: "/logout",
				key: "logout",
				name: "Logout",
			},
		],
	},
];
export default sidebar;
