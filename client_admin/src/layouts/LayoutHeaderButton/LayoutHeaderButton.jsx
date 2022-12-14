import classNames from "classnames/bind";
import React from "react";
import PageConfig from "~/stores/pages";
import { getKey } from "~/utils/util";

import styles from "./layoutHeaderButton.module.scss";
const cx = classNames.bind(styles);
function LayoutHeaderButton(props) {
	const { children, lastComp, className = null } = props;
	let key = getKey("route", window.location.pathname);
	let label = "";
	if (key) {
		label = PageConfig[key].label;
	}
	console.log(lastComp);
	return (
		<div className={cx("wrapper")}>
			<div className={cx("future-manager")}>
				<h2>{label}</h2>
				{lastComp}
			</div>
			<div className={cx("content", className)}>{children}</div>
		</div>
	);
}

export default LayoutHeaderButton;
