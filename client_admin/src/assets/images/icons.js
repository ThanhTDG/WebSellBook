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
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import ListIcon from "@mui/icons-material/List";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AddIcon from "@mui/icons-material/Add";
import ClassIcon from "@mui/icons-material/Class";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import SortIcon from "@mui/icons-material/Sort";
import UnfoldLessIcon from "@mui/icons-material/UnfoldLess";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import LockResetIcon from "@mui/icons-material/LockReset";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import PaymentIcon from "@mui/icons-material/Payment";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddCardIcon from "@mui/icons-material/AddCard";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
const Navbar = ({ className }) => {
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

const Sidebar = ({ className }) => {
	return {
		list: <ListIcon className={className} />,
		home: <DashboardIcon className={className} />,
		role: <SettingsAccessibilityIcon className={className} />,
		categories: <ClassIcon className={className} />,
		products: <StorefrontIcon className={className} />,
		orders: <CreditCardIcon className={className} />,
		users: <ManageAccountsIcon className={className} />,
		customer: <PeopleOutlineIcon className={className} />,
		delivery: <LocalShippingIcon className={className} />,
		stats: <QueryStatsIcon className={className} />,
		notifications: <NotificationsNoneIcon className={className} />,
		system_health: <DnsIcon className={className} />,
		logs: <SettingsSystemDaydreamIcon className={className} />,
		profile: <AccountBoxIcon className={className} />,
		logout: <ExitToAppIcon className={className} />,
		receipts: <LocalShippingIcon className={className} />,
		accountAdmins: <RecentActorsIcon className={className} />,
	};
};
const Chart = ({ className }) => {
	return {
		increase: <TrendingUpIcon className={className} />,
		left: <ArrowForwardIcon className={className} />,
		close: <CloseIcon className={className} />,
	};
};
const Dialog = ({ className }) => {
	return {
		question: <QuestionMarkIcon className={className} />,
		warning: <WarningAmberIcon className={className} />,
	};
};
const Widget = ({ className }) => {
	return {
		users: <PersonOutlineIcon className={className} />,
		order: <ShoppingCartOnOutlinedIcon className={className} />,
		earning: <MonetizationOnOutlinedIcon className={className} />,
		balance: <AccountBalanceWalletIcon className={className} />,
	};
};
const Button = ({ className }) => {
	return {
		users: <PersonOutlineIcon className={className} />,
		parent: <InsertLinkIcon className={className} />,
		add: <AddIcon className={className} />,
		addBox: <AddBoxIcon className={className} />,
		order: <ShoppingCartOnOutlinedIcon className={className} />,
		earning: <MonetizationOnOutlinedIcon className={className} />,
		balance: <AccountBalanceWalletIcon className={className} />,
		close: <HighlightOffOutlinedIcon className={className} />,
		closeNoOutline: <CloseIcon className={className} />,
		search: <SearchIcon className={className} />,
		delete: <DeleteOutlineIcon className={className} />,
		link: <InsertLinkIcon className={className} />,
		list: <SortIcon className={className} />,
		unless: <UnfoldLessIcon className={className} />,
		upload: <CloudUploadIcon className={className} />,
		reset: <LockResetIcon className={className} />,
		change: <DriveFileRenameOutlineIcon className={className} />,
		imageChange: <AddPhotoAlternateIcon className={className} />,
		notPaid: <MonetizationOnIcon className={className} />,
		paidFull: <CheckCircleIcon className={className} />,
		onePartPaid: <PriceChangeIcon className={className} />,
		cashOnDelivery: <LocalShippingIcon className={className} />,
		view: <RemoveRedEyeIcon className={className} />,
		paid: <LocalAtmIcon className={className} />,
	};
};
export { Navbar, Sidebar, Chart, Widget, Button, Dialog };
