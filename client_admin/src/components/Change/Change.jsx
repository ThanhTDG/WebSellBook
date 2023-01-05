import React from "react";
import classNames from "classnames/bind";
import styles from "./change.module.scss";
import { constants } from "~/stores";
import { icons } from "~/assets/images";

const cx = classNames.bind(styles);
function Change(props) {
	const { title = constants.CHANGE, oldValue, newValue, className } = props;
	const checkValid = (value) => {
		if (value) {
			return value;
		} else {
			return icons.Chart(cx("icon")).close;
		}
	};
	if (newValue === oldValue) {
		return (
			<div className={cx("wrapper", className)}>
				<div className={cx("title", "max") + " single-line"}>{constants.CURRENT + `: ${newValue}`}</div>
			</div>
		);
	} else {
		return (
			<div className={cx("wrapper", className)}>
				<div className={cx("title")}>{title}:</div>
				<div
					className={cx("old-value", oldValue ? (newValue ? cx("normal") : cx("max")) : cx("icon")) + " single-line"}
				>
					{checkValid(oldValue)}
				</div>
				<div className={cx("icon")}>{icons.Chart("").left}</div>
				<div
					className={cx("new-value", newValue ? (oldValue ? cx("normal") : cx("max")) : cx("icon")) + " single-line"}
				>
					{checkValid(newValue)}
				</div>
			</div>
		);
	}
}

export default Change;
