import images, { icons } from "~/assets/images";
import React from "react";
import { navbarOptions } from "./navbarOption.js";
import { Search } from "@mui/icons-material";
import styles from "./header.module.scss";
import classNames from "classnames/bind";
import PageConfig from "~/stores/pages.js";
import { constants } from "~/stores";
import { Link } from "react-router-dom";
import Image from "~/components/Image/index.js";
import { useGlobalState } from "~/hooks/useGlobalState.js";
const cx = classNames.bind(styles);
function Header(props) {
	const { left = null, right = null, showLogo = false } = props;
	const [state, dispatch] = useGlobalState();
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
					<div className={cx("background")}>
						<Image
							className={cx("avatar")}
							src={state.profile.avatar}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Header;
