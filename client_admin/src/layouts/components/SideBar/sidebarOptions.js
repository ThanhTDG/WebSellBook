import { default as PageConfig } from "~/config/pages";
export const sidebarOptions = [
	{
		title: "Main",
		item: [PageConfig.home],
	},
	{
		title: "Lists",
		item: [
			PageConfig.products,
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
		title: "Useful",
		item: [
			{
				link: "/stats",
				key: "stats",
				name: "Stats",
			},
			{
				link: "/notifications",
				key: "notifications",
				name: "Notifications",
			},
		],
	},
	{
		title: "Service",
		item: [
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
		title: "USER",
		item: [
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
