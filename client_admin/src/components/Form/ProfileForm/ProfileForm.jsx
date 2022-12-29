import classNames from "classnames/bind";
import React from "react";
import { useEffect } from "react";
import { icons } from "~/assets/images";
import Controls from "~/components/controls";
import CreateNUpdateDay from "~/components/CreateNUpdateDay";
import Image from "~/components/Image";
import OutlinedBox from "~/components/OutlinedBox";
import useForm from "~/hooks/useForm";
import { actions, constants } from "~/stores";
import profileProp from "~/stores/Account/profileProps";
import typeFeature from "~/stores/types/typeFeature";
import { displayDay } from "~/utils/util";

import styles from "./profileForm.module.scss";
const cx = classNames.bind(styles);

const sexProps = [
	{ id: true, name: "Nam" },
	{ id: false, name: "Nữ" },
];

function ProfileForm(props) {
	const {
		user,
		type = typeFeature.isCurrent,
		isEdit = false,
		handleAction,
		editMode,
		dispatchEditMode,
		className,
	} = props;
	const form = useForm({ ...user });
	console.log(user);
	const { values, setValues, errors, setErrors, handleInputChange } = form;
	let typeDisplay = isEdit ? values : user;
	const emptyFunction = () => {
		dispatchEditMode(actions.setIsChange(true));
	};
	useEffect(() => {
		if (!editMode.enableEdit) {
			setValues(user);
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

				<Controls.Button
					className={cx("btn-change-avatar")}
					outline
					rightIcon={icons.Button("").imageChange}
				>
					{constants.CHANGE_IMAGE}
				</Controls.Button>
			</div>

			<div className={cx("basic")}>
				<Controls.Input
					name={"email"}
					label={profileProp.email.label}
					value={typeDisplay.email}
					onChange={isEdit ? handleInputChange : emptyFunction}
					required={profileProp.email.required}
					error={errors && errors.email ? errors.email : ""}
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
							value={displayDay(typeDisplay.lastSession)}
						/>
					)}
					{typeDisplay.createdAt && typeDisplay.updatedAt && (
						<CreateNUpdateDay
							createdAt={displayDay(typeDisplay.createdAt)}
							updatedAt={displayDay(typeDisplay.createdAt)}
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
