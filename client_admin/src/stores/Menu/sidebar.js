import { Link } from "react-router-dom";
import { icons } from "~/assets/images";
import { default as PageConfig } from "~/stores/pages";
import * as constants from "~/stores/constants";
const sidebar = [
	{
		key: "home",
		label: <Link to={PageConfig.home.route}>{constants.HOME}</Link>,
		icon: icons.Sidebar("icon").home,
	},
	{
		key: "list",
		label: "Danh sách",
		icon: icons.Sidebar("icon").list,
		children: [
			{
				key: PageConfig.categories.key,
				label: <Link to={PageConfig.categories.route}>{constants.CATEGORY}</Link>,
				icon: icons.Sidebar("icon").categories,
			},
			{
				key: PageConfig.products.key,
				label: <Link to={PageConfig.products.route}>{constants.PRODUCT}</Link>,
				icon: icons.Sidebar("icon").products,
			},
			{
				key: PageConfig.customers.key,
				label: <Link to={PageConfig.customers.route}>{constants.CUSTOMER}</Link>,
				icon: icons.Sidebar("icon").customer,
			},
			{
				key: PageConfig.accountAdmins.key,
				label: <Link to={PageConfig.accountAdmins.route}>{constants.ACCOUNT_ADMIN}</Link>,
				icon: icons.Sidebar("icon").accountAdmins,
			},
			{
				key: PageConfig.role.key,
				label: <Link to={PageConfig.role.route}>{constants.ROLE}</Link>,
				icon: icons.Sidebar("icon").role,
			},
		],
	},
	{
		key: PageConfig.receipts.key,
		label: <Link to={PageConfig.receipts.route}>{constants.RECEIPTS}</Link>,
		icon: icons.Sidebar("icon").receipts,
	},
	{
		key: PageConfig.profile.key,
		label: <Link to={PageConfig.profile.route}>{constants.PROFILE}</Link>,
		icon: icons.Sidebar("icon").profile,
	},
	{
		key: PageConfig.logout.key,
		label: <Link to={PageConfig.logout.route}>{constants.LOGOUT}</Link>,
		icon: icons.Sidebar("icon").logout,
	},
];
export default sidebar;
