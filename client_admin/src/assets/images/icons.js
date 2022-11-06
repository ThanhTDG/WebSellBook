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

const Navbar = {
	search: <SearchIcon className="icon" />,
	language: <LanguageIcon className="icon" />,
	darkModeIcon: <DarkModeIcon className="icon" />,
	exitFullMode: <FullscreenExitIcon className="icon" />,
	notification: <NotificationsNoneIcon className="icon" />,
	chat: <ChatBubbleOutlineIcon className="icon" />,
	list: <FormatListBulletedIcon className="icon" />,
};
const Sidebar = {
	home: <DashboardIcon className="icon" />,
	products: <StorefrontIcon className="icon" />,
	orders: <CreditCardIcon className="icon" />,
	users: <PeopleOutlineIcon className="icon" />,
	delivery: <LocalShippingIcon className="icon" />,
	stats: <QueryStatsIcon className="icon" />,
	notifications: <NotificationsNoneIcon className="icon" />,
	system_health: <DnsIcon className="icon" />,
	logs: <SettingsSystemDaydreamIcon className="icon" />,
	profile: <AccountBoxIcon className="icon" />,
	logout: <ExitToAppIcon className="icon" />,
};
const Chart = {
	increase: <TrendingUpIcon className="icon" />,
};

export { Navbar, Sidebar, Chart };
