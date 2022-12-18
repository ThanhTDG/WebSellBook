import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { constants } from "~/stores";
import Loading from "~/components/Loading";
import Controls from "~/components/controls";
import classNames from "classnames/bind";
import styles from "./roleTab.module.scss";
import OutlinedBox from "~/components/OutlinedBox";
import { useEffect } from "react";
import * as initState from "~/stores/initStates";
import * as configRole from "~/stores/roles";
import RoleItem from "~/components/Menu/RoleItem";
import RoleModule from "~/components/RoleModule";
import * as rolesConfig from "~/stores/roles";
import { AllInbox } from "@mui/icons-material";
import { copyObject } from "~/utils/util";
import CreateNUpdateDay from "~/components/CreateNUpdateDay";
const cx = classNames.bind(styles);
function RoleTab(props) {
	const { role } = props;
	const [edit, setEdit] = useState({ ...copyObject(initState.editState), isNew: role === null });
	const [roleDetail, setRoleDetail] = useState(
		role ? copyObject(role) : edit.isNew ? copyObject(initState.newRole) : undefined
	);
	console.log(roleDetail);
	const [userRoles, setUserRoles] = useState(copyObject(initState.role));
	const [tabIndex, setTabIndex] = useState("1");
	const [users, setUsers] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		if (!roleDetail || roleDetail.id === null) {
			setIsLoading(false);
			return;
		} else {
			const roleAvailable = copyObject(initState.role);
			if (roleDetail.permissions.length !== 0) {
				Object.keys(rolesConfig.types).map((type) => {
					Object.keys(rolesConfig.actions).map((action) => {
						if (roleDetail.permissions.find((id) => id === rolesConfig.roles[type][action].id)) {
							console.log(true);
							roleAvailable[type][action].enable = true;
						} else {
							roleAvailable[type][action].enable = false;
						}
					});
				});
				setUserRoles(roleAvailable);
			}
			setIsLoading(false);
		}
	}, []);
	useEffect(() => {
		if (JSON.stringify(roleDetail) !== JSON.stringify(role)) {
			if (!edit.isNew) {
				setEdit({ ...edit, isEdit: true });
			}
		} else {
			setEdit({ ...edit, isEdit: false });
		}
	}, [roleDetail]);
	const handleTabChange = (event, newValue) => {
		setTabIndex(newValue);
	};
	const handleRoleChange = (enable, value, type, action) => {
		let userPermissions = copyObject(roleDetail.permissions);
		if (enable) {
			userPermissions.push(value);
		} else {
			userPermissions = roleDetail.permissions.filter((id) => id !== value);
		}
		setRoleDetail({
			...roleDetail,
			permissions: userPermissions,
		});
		setUserRoles({
			...userRoles,
			[type]: {
				...userRoles[type],
				[action]: {
					enable: enable,
				},
			},
		});
	};
	const headerAccount = `${constants.ACCOUNT}(${users ? users.length : ""})`;
	return (
		<Box className={cx("body-tab")}>
			{roleDetail && (
				<Loading isLoading={isLoading}>
					<div className={cx("header-tab-role")}>
						<div className={cx("role-name")}>Chỉnh sửa - {roleDetail.name}</div>
						<div className="role-control"></div>
					</div>
					<TabContext value={tabIndex}>
						<Box sx={{ borderBottom: 1, borderColor: "divider", paddingLeft: "16px" }}>
							<TabList
								onChange={handleTabChange}
								aria-label="role-tab"
							>
								<Tab
									label={constants.BASIC_INFO}
									value="1"
								/>
								<Tab
									label={constants.PERMISSIONS}
									value="2"
								/>
								<Tab
									label={headerAccount}
									value="3"
								/>
							</TabList>
						</Box>
						<TabPanel
							value="1"
							className={cx("tab-panel")}
						>
							<div className={cx("content")}>
								<div className={cx("tab-basic")}>
									<Controls.Input
										label={constants.ROLE_NAME}
										value={roleDetail.name}
									></Controls.Input>
									{roleDetail.createdAt && roleDetail.updatedAt && (
										<CreateNUpdateDay
											className={""}
											createdAt={roleDetail.createdAt}
											updatedAt={roleDetail.updatedAt}
										/>
									)}
									<div className={cx("desc")}>
										<div className={cx("title-desc")}>{constants.DESC}</div>
										<Controls.Textarea value={roleDetail.description} />
									</div>
								</div>
							</div>
						</TabPanel>
						<TabPanel
							value="2"
							className={cx("tab-panel")}
						>
							<div className={cx("permissions")}>
								{Object.keys(rolesConfig.types).map((type) => (
									<RoleModule
										keys={type}
										rolesModule={rolesConfig.roles[type]}
										type={type}
										onChange={handleRoleChange}
										values={userRoles}
									/>
								))}
							</div>
						</TabPanel>
						<TabPanel value="3">Item Three</TabPanel>
					</TabContext>
				</Loading>
			)}
			<div className={cx("btn-change")}>
				{edit.isNew && (
					<Controls.Button
						className={cx("btn-cancel")}
						type="button"
						primary
					>
						{"Thêm mới"}
					</Controls.Button>
				)}

				{edit.isEdit && (
					<Controls.Button
						primary
						type="button"
						className={cx("btn-confirm")}
					>{`Lưu lại`}</Controls.Button>
				)}
			</div>
		</Box>
	);
}

export default RoleTab;
