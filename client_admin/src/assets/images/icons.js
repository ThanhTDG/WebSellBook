import SearchIcon from "@mui/icons-material/Search";
import LanguageIcon from "@mui/icons-material/Language";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import DashboardIcon from "@mui/icons-material/Dashboard";
import StorefrontIcon from "@mui/icons-material/Storefront";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import DnsIcon from "@mui/icons-material/Dns";
import SettingsSystemDaydreamIcon from "@mui/icons-material/SettingsSystemDaydream";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ShoppingCartOnOutlinedIcon from "@mui/icons-material/ShoppingCart";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";

const Navbar = ({className}) => {
	return {
		search: <SearchIcon className={className} />,
		language: <LanguageIcon className={className} />,
		darkModeIcon: <DarkModeIcon className={className} />,
		exitFullMode: <FullscreenExitIcon className={className} />,
		notification: <NotificationsNoneIcon className={className} />,
		chat: <ChatBubbleOutlineIcon className={className} />,
		list: <FormatListBulletedIcon className={className} />,
	};
};

const Sidebar = ({className}) => {
	return {
		home: <DashboardIcon className={className} />,
		products: <StorefrontIcon className={className} />,
		orders: <CreditCardIcon className={className} />,
		users: <PeopleOutlineIcon className={className} />,
		delivery: <LocalShippingIcon className={className} />,
		stats: <QueryStatsIcon className={className} />,
		notifications: <NotificationsNoneIcon className={className} />,
		system_health: <DnsIcon className={className} />,
		logs: <SettingsSystemDaydreamIcon className={className} />,
		profile: <AccountBoxIcon className={className} />,
		logout: <ExitToAppIcon className={className} />,
	};
};
const Chart = ({className}) => {
	return {
		increase: <TrendingUpIcon className={className} />,
	};
};

const Widget = ({className}) => {
	return {
		users: <PersonOutlineIcon className={className} />,
		order: <ShoppingCartOnOutlinedIcon className={className} />,
		earning: <MonetizationOnOutlinedIcon className={className} />,
		balance: <AccountBalanceWalletIcon className={className} />,
	};
};
export { Navbar, Sidebar, Chart, Widget };
