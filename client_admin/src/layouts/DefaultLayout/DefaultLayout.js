import NavBar from "~/layouts/components/Navbar";
import SideBar from "~/layouts/components/Sidebar";
import "./defaultLayout.scss";
function DefaultLayout({ children }) {
	return (
		<div className="layout">
			<div className="container">
				<SideBar className="sidebar" />
				<div className="content">{children}</div>
			</div>
		</div>
	);
}

export default DefaultLayout;
