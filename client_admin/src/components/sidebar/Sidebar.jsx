import "./sidebar.scss"
import DashboardIcon from '@mui/icons-material/Dashboard';
function Sidebar() {
  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo">Đây là logo</span>
      </div>
      <hr />
      <div className="center">
        <ul>
          <li>
            <DashboardIcon />
            <span>Dashboard</span>
          </li>
        </ul>
        <ul>
          <li>
            <DashboardIcon />
            <span>Product</span>
          </li>
        </ul>
        <ul>
          <li>
            <DashboardIcon />
            <span>Orders</span>
          </li>
        </ul>
        <ul>
          <li>
            <DashboardIcon />
            <span>Users</span>
          </li>
        </ul>
      </div>
      <div className="bottom">color options</div>
    </div>
  )
}

export default Sidebar