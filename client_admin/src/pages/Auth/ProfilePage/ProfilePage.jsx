import classNames from "classnames/bind";
import React from "react";
import { useReducer } from "react";
import ProfileForm from "~/components/Form/ProfileForm";
import useForm from "~/hooks/useForm";
import { useGlobalState } from "~/hooks/useGlobalState";
import InfoLayout from "~/layouts/InfoLayout";
import { authService } from "~/services";
import { actions, cusReducer } from "~/stores";
import styles from "./profile.module.scss";
const cx = classNames.bind(styles);
function ProfilePage() {
	const [state, dispatch] = useGlobalState();
	const [editMode, dispatchEditMode] = useReducer(
		cusReducer.reducers.EditModeReducer,
		cusReducer.initStates.editModeState
	);
	const form = useForm({ ...state.profile });
	const { values, setValues, errors, setErrors, handleInputChange } = form;
	const updateProfile = async () => {
		dispatchEditMode(actions.setStatusIsLoading());
		const response = await authService.updateProfile(values);
		if (response) {
			setValues(response.user);
			dispatch(actions.setLoginNInfo({ profile: { ...response.user } }));
			dispatchEditMode(actions.setStatusIsSuccess());
		} else {
			dispatchEditMode(actions.setStatusIsError());
		}
	};
	const handleUpdateProfile = () => {
		updateProfile();
	};
	return (
		<InfoLayout
			editMode={editMode}
			showDelete={false}
			dispatchEditMode={dispatchEditMode}
			onClickChange={handleUpdateProfile}
		>
			<div className={cx("wrapper")}>
				<ProfileForm
					isEdit={editMode.enableEdit}
					editMode={editMode}
					dispatchEditMode={dispatchEditMode}
					user={state.profile}
					dispatch={dispatch}
					form={form}
				/>
			</div>
		</InfoLayout>
	);
}

export default ProfilePage;
