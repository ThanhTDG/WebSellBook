import React, { useReducer, useState } from "react";
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
import * as initStates from "~/stores/initStates";
import * as reducers from "~/stores/reducers";
import { actions, constants } from "~/stores";
import useForm from "~/hooks/useForm";
import typeFeature from "~/stores/types/typeFeature";
import { Modal } from "antd";
const cx = classNames.bind(styles);
const { confirm } = Modal;
function RolePage() {
	const [editMode, dispatchEditMode] = useReducer(reducers.EditModeReducer, initStates.editModeState);

	const [role, setRole] = useState([]);
	const [roles, setRoles] = useState([]);
	const [permissions, setPermissions] = useState([]);
	const [idSelect, setIdSelect] = useState("");
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
		if (editMode.isChange) {
			confirm({
				title: <div>Hừm bạn đang thay đổi</div>,
				onOk: () => {
					dispatchEditMode(actions.setResetAll());
					setIdSelect(id);
				},
			});
		} else {
			setIdSelect(id);
		}
	};
	return (
		<InfoLayout
			editMode={editMode}
			onClickChange={"oke"}
			dispatchEditMode={dispatchEditMode}
			typeModel={constants.ROLE.toLocaleLowerCase()}
			showFeature={idSelect}
			textConfirm={idSelect ? "" : constants.ADD_NEW}
			type={idSelect !== null ? typeFeature.isEdit : typeFeature.isNew}
		>
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
									dispatchEditMode={dispatchEditMode}
									role={initStates.role}
									permissions={permissions}
									isEdit={true}
								/>
							)}
							{roles.map((role) => {
								return (
									idSelect === role.id && (
										<RoleTab
											dispatchEditMode={dispatchEditMode}
											isEdit={editMode.enableEdit}
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
