import React from "react";
import SvgIcon from "@mui/material/SvgIcon";
import styles from "./outlinedBox.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

function OutlinedBox({ icon, title, type = "normal", classNameHeader, className = null, children }) {
	const classesTitle = cx("title", {
		[type]: type,
	});
	const classNameChildren = cx("childrenContainer", {
		[className]: className,
	});
	return (
		<div className={cx("wrapper", classNameHeader)}>
			<div className={cx("header")}>
				<div className={cx("headerBorderBefore")}></div>
				{(icon || title) && (
					<div className={cx("headerTitle")}>
						{icon && <SvgIcon component={icon} />}
						{title && <span className={classesTitle}>{title}</span>}
					</div>
				)}
				<div className={cx("headerBorderAfter")}></div>
			</div>
			<div className={classNameChildren}>{children}</div>
		</div>
	);
}

export default OutlinedBox;
