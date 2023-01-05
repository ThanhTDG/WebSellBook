import React from "react";
import classNames from "classnames/bind";

import styles from "./roleItem.module.scss";
import Controls from "~/components/controls";

const cx = classNames.bind(styles);
function RoleItem(props) {
	const { role, disable = false, isChecked, onChange, main } = props;
	return (
		<div className={cx("wrapper", main ? "main" : "child")}>
			<div className={cx("text")}>
				<div className={cx("name", getType(role.dangerous))}>{role.name}</div>
				<div className={cx("desc")}>{role.desc}</div>
			</div>
			<div className={cx("switch")}>
				<Controls.Switch
					checked={isChecked}
					onChange={onChange}
					value={role.id}
				/>
			</div>
		</div>
	);
}
function getType(level) {
	switch (level) {
		case 1:
			return "alert";
		case 2:
			return "warning";
		default:
		case 3:
			return "basic";
	}
}

export default RoleItem;
