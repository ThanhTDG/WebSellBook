import React from "react";
import SvgIcon from "@mui/material/SvgIcon";
import styles from "./outlineBox.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

function OutlinedBox({ icon, title, type = "normal", children }) {
	const classesTitle = cx("title", {
		[type]: type,
	});
	return (
		<div className={cx("mainContainer")}>
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
			<div className={cx("childrenContainer")}>{children}</div>
		</div>
	);
}

export { OutlinedBox };
