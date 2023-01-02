import React from "react";
import { useState } from "react";
import { useReducer } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import classNames from "classnames/bind";

import ProfileForm from "~/components/Form/ProfileForm";
import InfoLayout from "~/layouts/InfoLayout";
import { getRoles } from "~/services/roleService";
import { cusReducer } from "~/stores";
import typeFeature from "~/stores/types/typeFeature";
import * as userService from "~/services/userService";
import styles from "./accountAdminPage.module.scss";
import Loading from "~/components/Loading";
const cx = classNames.bind(styles);
function AccountAdminPage() {
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
		const [responseUser, responseRoles] = await Promise.all([
			userService.getUserById(id),
			getRoles(),
		]);
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
			showEdit={false}
			dispatchEditMode={dispatchEditMode}
		>
			<Loading isLoading={isLoading}>
				<div className={cx("wrapper")}>
					<div className={cx("basic")}>
						<ProfileForm
							type={typeFeature.isEdit}
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

export default AccountAdminPage;
