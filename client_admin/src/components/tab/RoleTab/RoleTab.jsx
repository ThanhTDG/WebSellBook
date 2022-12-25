import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { actions, constants } from "~/stores";
import Loading from "~/components/Loading";
import Controls from "~/components/controls";
import classNames from "classnames/bind";
import styles from "./roleTab.module.scss";
import OutlinedBox from "~/components/OutlinedBox";
import { useEffect } from "react";
import * as initStates from "~/stores/initStates";
import * as configRole from "~/stores/roles";
import RoleItem from "~/components/Menu/RoleItem";
import RoleModule from "~/components/RoleModule";
import * as rolesConfig from "~/stores/roles";
import { AllInbox } from "@mui/icons-material";
import { copyObject } from "~/utils/util";
import CreateNUpdateDay from "~/components/CreateNUpdateDay";
import useForm from "~/hooks/useForm";
import { useGlobalState } from "~/hooks/useGlobalState";
import { globalContext } from "~/stores/contexts";
const cx = classNames.bind(styles);
function RoleTab(props) {
	const { role, isEdit, dispatchEditMode } = props;
	const [globalState, setGlobalState] = useGlobalState(globalContext);
	const { values, setValues, errors, setErrors, handleInputChange } = useForm(role);
	const [userRoles, setUserRoles] = useState(copyObject(initStates.permissions));
	const [tabIndex, setTabIndex] = useState("1");
	const [users, setUsers] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		if (!role || role.id === null) {
			setIsLoading(false);
			return;
		} else {
			const roleAvailable = copyObject(initStates.permissions);
			if (role.permissions.length !== 0) {
				Object.keys(rolesConfig.types).map((type) => {
					Object.keys(rolesConfig.actions).map((action) => {
						if (role.permissions.find((id) => id === rolesConfig.roles[type][action].id)) {
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
		if (JSON.stringify(values) !== JSON.stringify(role)) {
			dispatchEditMode(actions.setIsChange(true));
		}
	}, [values]);
	const handleTabChange = (event, newValue) => {
		setTabIndex(newValue);
	};
	const handleRoleChange = (enable, value, type, action) => {
		let userPermissions = copyObject(role.permissions);
		if (enable) {
			userPermissions.push(value);
		} else {
			userPermissions = role.permissions.filter((id) => id !== value);
		}
		setValues({
			...values,
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
			{role && (
				<Loading isLoading={isLoading}>
					<div className={cx("header-tab-role")}>
						<div className={cx("role-name")}>Chỉnh sửa - {role.name}</div>
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
										value={isEdit ? values.name : role.name}
										name="name"
										onChange={isEdit ? handleInputChange : ""}
									></Controls.Input>
									{role.createdAt && role.updatedAt && (
										<CreateNUpdateDay
											className={""}
											createdAt={role.createdAt}
											updatedAt={role.updatedAt}
										/>
									)}
									<div className={cx("desc")}>
										<div className={cx("title-desc")}>{constants.DESC}</div>
										<Controls.Textarea
											value={role.description}
											name={"description"}
											onChange={isEdit ? handleInputChange : ""}
										/>
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
		</Box>
	);
}

export default RoleTab;
