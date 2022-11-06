import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ShoppingCartOnOutlinedIcon from "@mui/icons-material/ShoppingCart";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";

export const type = {
	user: {
		key: "users",
		title: "USERS",
		isMoney: false,
		link: "See all users",
		icon: <PersonOutlineIcon className="icon users" />,
	},
	order: {
		key: "order",
		title: "ORDER",
		isMoney: false,
		link: "View all order",
		icon: <ShoppingCartOnOutlinedIcon className="icon order" />,
	},
	earning: {
		key: "earning",
		title: "EARNING",
		isMoney: true,
		link: "View net earnings",
		icon: <MonetizationOnOutlinedIcon className="icon earning" />,
	},

	balance: {
		key: "balance",
		title: "BALANCE",
		isMoney: true,
		link: "View detail",
		icon: <AccountBalanceWalletIcon className="icon balance" />,
	},
};
