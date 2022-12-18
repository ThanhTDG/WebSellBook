import React, { useState } from "react";
import { useEffect } from "react";
import Loading from "~/components/Loading";
import SelectMenu from "~/components/Menu/SelectMenu";
import RoleTab from "~/components/tab/RoleTab";
import classNames from "classnames/bind";
import TabCustomer from "~/components/tab/TabCustomer";

import LayoutHeaderButton from "~/layouts/LayoutHeaderButton";
import { getPermission, getRoles } from "~/services/roleService";
import styles from "./rolePage.module.scss";
import InfoLayout from "~/layouts/InfoLayout";

const cx = classNames.bind(styles);
function RolePage() {
	const [roles, setRoles] = useState([]);
	const [permissions, setPermissions] = useState([]);
	const [idSelect, setIdSelect] = useState();
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		fetchApi();
	}, []);
	useEffect(() => {}, [idSelect]);
	const fetchApi = async () => {
		const [resRole, resPermissions] = await Promise.all([getRoles(), getPermission()]);
		if (roles) {
			setRoles(resRole.docs);
			setPermissions(resPermissions.docs);
		}
		setIsLoading(false);
	};
	const onChangeMenuItem = (id) => {
		setIdSelect(id);
	};
	console.log(permissions);
	return (
		<InfoLayout>
			<Loading isLoading={isLoading}>
				<div className={cx("wrapper")}>
					<div className={cx("layout")}>
						<div className={cx("menu-item")}>
							<SelectMenu
								options={roles}
								idSelect={idSelect}
								onChange={onChangeMenuItem}
							/>
						</div>
						<div className={cx("detail")}>
							{idSelect === null && (
								<RoleTab
									role={idSelect}
									permissions={permissions}
								/>
							)}
							{roles.map((role) => {
								return (
									idSelect === role.id && (
										<RoleTab
											permissions={permissions}
											role={role}
										/>
									)
								);
							})}
						</div>
					</div>
				</div>
			</Loading>
		</InfoLayout>
	);
}

export default RolePage;
