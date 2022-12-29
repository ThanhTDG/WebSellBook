import React, { useReducer, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import classNames from "classnames/bind";

import styles from "./customerPage.module.scss";
import InfoLayout from "~/layouts/InfoLayout";
import { cusReducer } from "~/stores";
import * as userService from "~/services/userService";
import { getPermission, getRoles } from "~/services/roleService";
import ProfileForm from "~/components/Form/ProfileForm";
import Loading from "~/components/Loading";

const cx = classNames.bind(styles);
function CustomerPage() {
	const [editMode, dispatchEditMode] = useReducer(
		cusReducer.reducers.EditModeReducer,
		cusReducer.initStates.editModeState
	);
	const { id } = useParams();
	const [isLoading, setIsLoading] = useState(false);
	const [user, setUser] = useState({});
	const [roles, setRoles] = useState([]);
	useEffect(() => {
		setIsLoading(true);
		fetchApi();
	}, []);
	const handleUser = (result) => {
		if (result) {
			delete result._id;
			setUser({
				...result,
				id: id,
			});
		}
	};
	const fetchApi = async () => {
		const [responseUser, responseRoles] = await Promise.all([userService.getUserById(id), getRoles()]);
		if (responseUser && responseRoles) {
			handleUser(responseUser);
			setRoles(responseRoles.docs);
		} else {
		}
		setIsLoading(false);
	};
	return (
		<InfoLayout
			id={id}
			editMode={editMode}
			dispatchEditMode={dispatchEditMode}
		>
			<Loading isLoading={isLoading}>
				<div className={cx("wrapper")}>
					<div className={cx("basic")}>
						<ProfileForm
							isEdit={editMode.enableEdit}
							user={user}
							editMode={editMode}
							dispatchEditMode={dispatchEditMode}
						/>
					</div>
				</div>
			</Loading>
		</InfoLayout>
	);
}

export default CustomerPage;
