import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ShoppingCartOnOutlinedIcon from "@mui/icons-material/ShoppingCart";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";

export const type = {
	user: {
		key: "users",
		title: "Người dùng",
		isMoney: false,
		link: "Xem tất cả",
	},
	order: {
		key: "order",
		title: "Đơn hàng",
		isMoney: false,
		link: "Xem tất cả đơn hàng",
	},
	earning: {
		key: "earning",
		title: "Doanh thu",
		isMoney: true,
		link: "Xem doanh thu",
	},

	balance: {
		key: "balance",
		title: "Bảng cân đối",
		isMoney: true,
		link: "View detail",
	},
};
