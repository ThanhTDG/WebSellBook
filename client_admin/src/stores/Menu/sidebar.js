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
				key: PageConfig.customer.key,
				label: <Link to={PageConfig.customer.route}>{constants.CUSTOMER}</Link>,
				icon: icons.Sidebar("icon").customer,
			},
			{
				key: PageConfig.role.key,
				label: <Link to={PageConfig.role.route}>{constants.ROLE}</Link>,
				icon: icons.Sidebar("icon").role,
			},
		],
	},
];
export default sidebar;
