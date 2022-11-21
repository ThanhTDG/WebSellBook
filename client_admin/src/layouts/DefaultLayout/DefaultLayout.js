import { Title } from "@mui/icons-material";
import NavBar from "~/layouts/components/Navbar";
import SideBar from "~/layouts/components/Sidebar";
import styles from "./defaultLayout.module.scss";
import classNames from "classnames/bind";
import { getKey } from "~/utils/util";
import PageConfig from "~/config/pages";
const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
	let key = getKey("route", window.location.pathname);
	let title = "";
	if (key) {
		title = PageConfig[key].title;
	}
	return (
		<div className={cx("layout")}>
			<SideBar className={cx("sidebar")} />
			<div className={cx("container")}>
				<div className={cx("header")}>
					<NavBar></NavBar>
				</div>
				<div className={cx("content")}>
					<div className={cx("title")}>
						<h2>{title}</h2>
					</div>
					{children}
				</div>
			</div>
		</div>
	);
}

export default DefaultLayout;
