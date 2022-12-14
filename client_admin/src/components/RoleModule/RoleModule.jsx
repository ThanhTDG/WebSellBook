import React from "react";
import classNames from "classnames/bind";

import styles from "./roleModule.module.scss";
import RoleItem from "../Menu/RoleItem";
import { useEffect } from "react";
import * as rolesConfig from "~/stores/roles";

const cx = classNames.bind(styles);

function RoleModule(props) {
	const { rolesModule, type, onChange, values } = props;
	const handleChange = (e, type, action) => {
		onchange(e.target.checked, e.target.value, type, action);
	};
	return (
		<div className={cx("wrapper")}>
			{Object.keys(rolesConfig.actions).map((action) => (
				<RoleItem
					role={rolesModule[action]}
					onChange={(e) => onChange(e.target.checked, e.target.value, type, action)}
					disable={!values[type].all || !values.all[action] || !values.all.all}
					isChecked={values[type][action].enable}
					main={action === "all"}
				/>
			))}
		</div>
	);
}

export default RoleModule;
