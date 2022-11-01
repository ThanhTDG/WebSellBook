import NavBar from "~/layouts/components/NavBar";
import SideBar from "~/layouts/components/SideBar";

function DefaultLayout({ children }) {
	return (
		<div>
			<NavBar />
			<div className="container">
				<SideBar />
				<div className="content">{children}</div>
			</div>
		</div>
	);
}

export default DefaultLayout;
