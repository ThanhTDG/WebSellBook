import { icons } from "../../assets/images/ImageUtility.js"
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ShoppingCartOnOutlinedIcon from '@mui/icons-material/ShoppingCart'
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';

export const type = {
    user: {
        key: "USERS",
        title: "USERS",
        isMoney: false,
        link: "See all users",
        icon: <PersonOutlineIcon className='icon'
            style={{
                color: "crimson",
                backgroundColor: "rgba(255,0,0,0.2)",
            }} />
    },
    order: {
        key: "ORDER",
        title: "ORDER",
        isMoney: false,
        link: "View all order",
        icon: < ShoppingCartOnOutlinedIcon className='icon'
            style={{
                color: "goldenrod",
                backgroundColor: "rgba(218,165,32,0.2)",
            }} />
    },
    earning: {
        key: "EARNING",
        title: "EARNING",
        isMoney: true,
        link: "View net earnings",
        icon: <MonetizationOnOutlinedIcon className='icon'
            style={{
                color: "green",
                backgroundColor: "rgba(0,128,0,0.2)",
            }} />
    },

    balance: {
        key: "BALANCE",
        title: "BALANCE",
        isMoney: true,
        link: "View detail",
        icon: < AccountBalanceWalletIcon className='icon'
            style={{
                color: "purple",
                backgroundColor: "rgba(128,0,128,0.2)",
            }}
        />

    }
}