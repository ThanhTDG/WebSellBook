import NavBar from "~/components/layout/components/navbar";
import SideBar from "~/components/layout/components/navbar";

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
