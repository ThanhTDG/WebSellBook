import { icons } from "~/assets/images";
import React from "react";
import { navbarOptions } from "./navbarOption.js";
import { Search } from "@mui/icons-material";
import styles from "./header.module.scss";
import classNames from "classnames/bind";
import PageConfig from "~/stores/pages.js";
const cx = classNames.bind(styles);
function Header() {
	return (
		<div className={cx("wrapper")}>
			<div className={cx("left")}>
				<div className={cx("role")}>Vai trò</div>
			</div>
			<div className={cx("middle")}></div>
			<div className={cx("right")}>
				<div className={cx("item")}>
					<img
						src="https://i.pinimg.com/236x/62/9e/92/629e9282db7c2e44d4b6a1790952d11d.jpg"
						alt=""
						className={cx("avatar")}
					/>
				</div>
			</div>
		</div>
	);
}

export default Header;
