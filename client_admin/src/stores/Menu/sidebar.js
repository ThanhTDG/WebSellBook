import { Link } from "react-router-dom";
import { icons } from "~/assets/images";
import { default as PageConfig } from "~/stores/pages";
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
		],
	},
];
export default sidebar;
