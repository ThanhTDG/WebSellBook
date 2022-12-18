import images, { icons } from "~/assets/images";
import React from "react";
import { navbarOptions } from "./navbarOption.js";
import { Search } from "@mui/icons-material";
import styles from "./header.module.scss";
import classNames from "classnames/bind";
import PageConfig from "~/stores/pages.js";
import { constants } from "~/stores";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);
function Header(props) {
	const { left = null, right = null, showLogo = false } = props;
	return (
		<div className={cx("wrapper")}>
			{showLogo && (
				<Link
					className={cx("logo")}
					to={PageConfig.home.route}
				>
					<img
						src={images.logoAndText}
						alt={constants.WEB_NAME}
					/>
				</Link>
			)}
			<div className={cx("content")}>
				<div className={cx("left")}>{left}</div>
				<div className={cx("middle")}></div>
				<div className={cx("right")}>
					<div className={cx("component")}>{right}</div>
					<div className={cx("item")}>
						<img
							src="https://i.pinimg.com/236x/62/9e/92/629e9282db7c2e44d4b6a1790952d11d.jpg"
							alt={constants.AVATAR}
							className={cx("avatar")}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Header;
