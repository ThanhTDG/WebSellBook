import DashboardIcon from '@mui/icons-material/Dashboard';
import StorefrontIcon from '@mui/icons-material/Storefront';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import DnsIcon from '@mui/icons-material/Dns';
import SettingsSystemDaydreamIcon from '@mui/icons-material/SettingsSystemDaydream';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const images = {

    'dashboard': <DashboardIcon className="icon" />,
    'product': <StorefrontIcon className="icon" />,
    'orders': <CreditCardIcon className="icon" />,
    'users': <PeopleOutlineIcon className="icon" />,
    'delivery': <LocalShippingIcon className="icon" />,
    'stats': <QueryStatsIcon className="icon" />,
    'notifications': <NotificationsNoneIcon className="icon" />,
    'system_health': <DnsIcon className="icon" />,
    'logs': <SettingsSystemDaydreamIcon className="icon" />,
    'profile': <AccountBoxIcon className="icon" />,
    'logout': <ExitToAppIcon className="icon" />,
};

export default images;