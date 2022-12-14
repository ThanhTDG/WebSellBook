import React from "react";
import classNames from "classnames/bind";

import styles from "./roleItem.module.scss";
import Controls from "~/components/controls";

const cx = classNames.bind(styles);
function RoleItem(props) {
	const { role, disable = false, isChecked, onChange, main } = props;
	return (
		<div className={cx("wrapper", main ? "main" : "child")}>
			<div className={cx("header")}>
				<div className="name">{role.name}</div>
				<Controls.Switch
					checked={isChecked}
					onChange={onChange}
					value={role.id}
				/>
			</div>
			<div className={cx("desc")}>{role.desc}</div>
		</div>
	);
}

export default RoleItem;
