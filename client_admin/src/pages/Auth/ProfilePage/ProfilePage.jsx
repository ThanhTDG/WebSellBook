import classNames from "classnames/bind";
import React from "react";
import { useReducer } from "react";
import ProfileForm from "~/components/Form/ProfileForm";
import { useGlobalState } from "~/hooks/useGlobalState";
import InfoLayout from "~/layouts/InfoLayout";
import { cusReducer } from "~/stores";
import styles from "./profile.module.scss";
const cx = classNames.bind(styles);
function ProfilePage() {
	const [state, dispatch] = useGlobalState();
	const [editMode, dispatchEditMode] = useReducer(
		cusReducer.reducers.EditModeReducer,
		cusReducer.initStates.editModeState
	);
	return (
		<InfoLayout
			editMode={editMode}
			showDelete={false}
			dispatchEditMode={dispatchEditMode}
		>
			<div className={cx("wrapper")}>
				<ProfileForm
					isEdit={editMode.enableEdit}
					editMode={editMode}
					dispatchEditMode={dispatchEditMode}
					user={state.profile}
					dispatch={dispatch}
				/>
			</div>
		</InfoLayout>
	);
}

export default ProfilePage;
