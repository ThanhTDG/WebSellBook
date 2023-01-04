import classNames from "classnames/bind";
import React from "react";
import { useEffect } from "react";
import { icons } from "~/assets/images";
import Controls from "~/components/controls";
import CreateNUpdateDay from "~/components/CreateNUpdateDay";
import UploadAvatar from "~/components/Dialog/UploadAvatar/UploadAvatar";
import Image from "~/components/Image";
import OutlinedBox from "~/components/OutlinedBox";
import useForm from "~/hooks/useForm";
import { uploadAvatar } from "~/services/authService";
import { actions, constants } from "~/stores";
import profileProp from "~/stores/Account/profileProps";
import typeFeature from "~/stores/types/typeFeature";
import { displayTime } from "~/utils/display";

import styles from "./profileForm.module.scss";
const cx = classNames.bind(styles);

const sexProps = [
	{ id: true, name: "Nam" },
	{ id: false, name: "Nữ" },
];

function ProfileForm(props) {
	const {
		user,
		setUser,
		type = typeFeature.isCurrent,
		isEdit = false,
		handleAction,
		editMode,
		dispatchEditMode,
		className,
	} = props;
	const form = useForm({ ...user });
	const { values, setValues, errors, setErrors, handleInputChange } = form;
	let typeDisplay = isEdit ? values : user;
	const emptyFunction = () => {
		if (type === typeFeature.isCurrent) {
			dispatchEditMode(actions.setIsChange(true));
		}
	};
	const actionUpload = (list) => {
		if (list && list.length > 0) {
			handleUpload(list[0].file);
		}
	};
	const handleUpload = async (data) => {
		dispatchEditMode(actions.setStatusIsLoading());
		const response = await uploadAvatar(data);
		if (response) {
			setValues({
				...values,
				avatar: response.avatar,
			});
			setUser({
				...user,
				avatar: response.avatar,
			});
			dispatchEditMode(actions.setResetAll());
			dispatchEditMode(actions.setStatusIsSuccess());
		} else {
			dispatchEditMode(actions.setStatusIsError());
		}
	};
	useEffect(() => {
		if (!editMode.enableEdit) {
			if (JSON.stringify(values) !== JSON.stringify(user)) setValues(user);
			return;
		}
		if (JSON.stringify(values) === JSON.stringify(user)) {
			dispatchEditMode(actions.setIsChange(false));
		} else {
			dispatchEditMode(actions.setIsChange(true));
		}
	}, [editMode.enableEdit, values]);
	let fullName = `${typeDisplay.lastName} ${typeDisplay.firstName}`;
	return (
		<div className={cx("wrapper")}>
			<div className={cx("avatar-feature")}>
				<div className={cx("background")}>
					<Image
						className={cx("avatar")}
						src={typeDisplay.avatar}
					/>
				</div>
				{type === typeFeature.isCurrent && <UploadAvatar actionUpload={actionUpload} />}
			</div>

			<div className={cx("basic")}>
				<Controls.Input
					name={"email"}
					label={profileProp.email.label}
					value={typeDisplay.email}
					onChange={isEdit ? handleInputChange : emptyFunction}
					required={profileProp.email.required}
					error={errors && errors.email ? errors.email : ""}
					disabled={true}
				/>
				<div className={cx("last-first-name")}>
					<Controls.Input
						name={"firstName"}
						label={profileProp.firstName.label}
						value={typeDisplay.firstName}
						onChange={isEdit ? handleInputChange : emptyFunction}
						required={profileProp.firstName.required}
						error={errors && errors.firstName ? errors.firstName : ""}
					/>
					<Controls.Input
						name={"lastName"}
						label={profileProp.lastName.label}
						value={typeDisplay.lastName}
						onChange={isEdit ? handleInputChange : emptyFunction}
						required={profileProp.lastName.required}
						error={errors && errors.lastName ? errors.lastName : ""}
					/>
				</div>
				<Controls.Input
					disabled={true}
					name={"fullName"}
					label={profileProp.fullName.label}
					value={fullName}
				/>
				<Controls.Input
					name={"phone"}
					label={profileProp.phone.label}
					value={typeDisplay.phone}
					onChange={isEdit ? handleInputChange : emptyFunction}
					required={profileProp.phone.required}
					error={errors && errors.phone ? errors.phone : ""}
				/>
				<OutlinedBox className={cx("outline")}>
					<Controls.RadioGroup
						items={sexProps}
						name={"sex"}
						onChange={isEdit ? handleInputChange : emptyFunction}
						label={profileProp.sex.label}
						value={typeDisplay.sex}
					/>
				</OutlinedBox>

				<div className={cx("date")}>
					{typeDisplay.lastSession && (
						<Controls.Input
							disabled={true}
							name="lastSession"
							label={constants.LAST_SESSION}
							value={displayTime(typeDisplay.lastSession)}
						/>
					)}
					{typeDisplay.createdAt && typeDisplay.updatedAt && (
						<CreateNUpdateDay
							createdAt={displayTime(typeDisplay.createdAt)}
							updatedAt={displayTime(typeDisplay.createdAt)}
						/>
					)}
				</div>
				<Action
					type={type}
					action={handleAction}
				/>
			</div>
		</div>
	);
}
function Action({ type = typeFeature.isEdit, action }) {
	switch (type) {
		case typeFeature.isEdit:
			return (
				<Controls.Button
					outline
					className={cx("btn-action")}
					onClick={action}
					rightIcon={icons.Button({ className: cx("icon-action") }).reset}
				>
					{constants.RESET_PASSWORD}
				</Controls.Button>
			);
		case typeFeature.isCurrent:
			return (
				<Controls.Button
					primary
					className={cx("btn-action")}
					onClick={action}
					rightIcon={icons.Button({ className: cx("icon-action") }).change}
				>
					{constants.CHANGE_PASSWORD}
				</Controls.Button>
			);
		case typeFeature.isNew:
			return (
				<Controls.Button
					primary
					className={cx("btn-action")}
					onClick={action}
					rightIcon={icons.Button({ className: cx("icon-action") }).add}
				>
					{constants.CHANGE_PASSWORD}
				</Controls.Button>
			);
		default:
			return;
	}
}

export default ProfileForm;
