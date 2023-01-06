import React, { useState } from "react";
import classNames from "classnames/bind";
import { Modal } from "antd";
import { useEffect } from "react";

import styles from "./InfoLayout.module.scss";
import typeFeature from "~/stores/types/typeFeature";
import Header from "../components/HeaderCustom/Header";
import { actions, constants, cusReducer } from "~/stores";
import Controls from "~/components/controls";
import { icons } from "~/assets/images";
import { getKey } from "~/utils/util";
import PageConfig from "~/stores/pages";
import LoadingDialog from "~/components/Dialog/LoadingDialog";
import { useMemo } from "react";

const cx = classNames.bind(styles);

const { confirm } = Modal;

function InfoLayout(props) {
	const {
		id = "",
		current = {},
		newValue = {},
		editMode = cusReducer.initStates.editModeState,
		handleDelete,
		newFeature = null,
		dispatchEditMode = null,
		disableDelete = false,
		showDelete = true,
		type = typeFeature.isEdit,
		showFeature = true,
		onClickChange = false,
		addAction,
		children,
		showEdit = true,
		textConfirm,
		typeModel = "",
		moreName = "",
	} = props;
	const [navbar, setNavbar] = useState(false);
	let pageName = "";
	const handleIsEditChange = (e) => {
		let enable = e.target.checked;
		if (!enable && editMode.isChange === true) {
			confirm({
				title: <div className={cx("title-confirm")}>{"Thoát khỏi chế độ chỉnh sửa ?"}</div>,
				content: `Bạn muốn thoát khỏi chế độ chỉnh sửa ${typeModel} hiện tại? Lưu ý tiến độ và những gì bạn thay đổi sẽ bị loại bỏ !!!`,
				centered: true,
				onOk: () => {
					dispatchEditMode(actions.setResetAll());
				},
			});
		} else {
			dispatchEditMode(actions.setEnableEdit(enable));
		}
	};
	useEffect(() => {
		if (editMode.isChange && !editMode.enableEdit) {
			confirm({
				title: <div className={cx("title-confirm")}>{"Bật chế độ chỉnh sửa ?"}</div>,
				content: `Bạn bật chế độ chỉnh sửa ${typeModel}. Bật chế độ chỉnh sửa sẽ cho phép bạn chỉnh sửa ${typeModel} hiện tại !!!`,
				centered: true,
				onOk: () => {
					dispatchEditMode(actions.setEnableEdit(true));
				},
				onCancel: () => {
					dispatchEditMode(actions.setIsChange(false));
				},
			});
		}
	}, [editMode.isChange]);
	const getPageName = () => {
		let string = "";
		let path = window.location.pathname;
		if (path == "/") {
			path = PageConfig.home.route;
		}
		if (id) {
			path = path.replace(id, ":id");
		}
		let key = getKey("route", path);
		return `${PageConfig[key].label} ${moreName}`.trim();
	};
	pageName = getPageName();
	const actionFeature = {
		[typeFeature.isNew]: addAction,
		[typeFeature.isEdit]: handleIsEditChange,
	};
	const changeNavbar = () => {
		if (window.scrollY >= 48) {
			setNavbar(true);
		} else {
			setNavbar(false);
		}
	};
	const displayAction = (type, isEdit, action) => {
		switch (type) {
			case typeFeature.isEdit:
				return isEdit && action;
			case typeFeature.isNew:
				return action;
		}
	};
	const onClickDelete = () => {
		confirm({
			title: <div className={cx("title-confirm")}>{`Bạn muốn xóa ${typeModel} hiện tại?`}</div>,
			content: `Bạn muốn xóa ${typeModel} hiện tại? Lưu ý mọi thông tin về ${typeModel} sẽ biến mất`,
			centered: true,
			onOk: () => {
				handleDelete();
			},
		});
	};
	const typeFeatureComp = useMemo(() => {
		return (
			<TypeFeature
				showEdit={showEdit}
				showDelete={showDelete}
				type={type}
				value={editMode ? editMode.enableEdit : false}
				onChange={actionFeature[type]}
				onClickDelete={onClickDelete}
			/>
		);
	}, [editMode.enableEdit, newValue, current]);
	window.addEventListener("scroll", changeNavbar);
	return (
		<div className={cx("wrapper")}>
			<div className={cx("header")}>
				<Header
					showLogo={true}
					left={<div className={cx(navbar ? "title" : "non-display", "page-name")}>{pageName}</div>}
					right={
						<div className={cx(navbar ? "title" : "non-display", "feature")}>
							{newFeature}
							{showFeature && typeFeatureComp}
						</div>
					}
				/>
			</div>
			<div className={cx("body")}>
				<div className={cx("future-manager")}>
					<div className={cx("future", "page-name")}>{pageName}</div>
					{newFeature}
					{showFeature && typeFeatureComp}
				</div>
				<div className={cx("content", editMode ? editMode.enableEdit : false && onClickChange ? "more-bottom" : "")}>
					{children}
				</div>
				{displayAction(type, editMode ? editMode.enableEdit : false, onClickChange) && (
					<TypeAction
						isChange={editMode ? editMode.isChange : false}
						type={type}
						action={onClickChange}
						text={textConfirm}
					/>
				)}
			</div>
			{editMode && (
				<LoadingDialog
					editMode={editMode}
					dispatchEditMode={dispatchEditMode}
				/>
			)}
		</div>
	);
}

function TypeFeature(props) {
	const { type, onChange, value, onClickDelete, showEdit, showDelete } = props;
	switch (type) {
		case typeFeature.isEdit:
			return (
				<div className={cx("edit-n-delete")}>
					{showDelete && (
						<Controls.Button
							rightIcon={icons.Button("").delete}
							primary
							onClick={onClickDelete}
							className={cx("btn-delete")}
						>
							{constants.DELETE}
						</Controls.Button>
					)}
					{showEdit && (
						<div className={cx("edit", value ? "enable" : "")}>
							<div className={cx("label-edit", value ? "active" : "")}>{constants.EDIT}</div>
							<div className={cx("switch-edit")}>
								<Controls.Switch
									checked={value}
									onChange={onChange}
								/>
							</div>
						</div>
					)}
				</div>
			);
		case typeFeature.isNew:
			return (
				<Controls.Button
					className={cx("new")}
					primary
					rightIcon={icons.Button("").addBox}
					onClick={onChange}
				>
					{constants.ADD}
				</Controls.Button>
			);
	}
}
function TypeAction(props) {
	const { action, type, isChange, text } = props;
	let title = "";
	switch (type) {
		case typeFeature.isEdit:
			title = constants.SAVE_CHANGE;
			break;
		case typeFeature.isNew:
			title = constants.CONFIRM;
			break;
	}
	return (
		<div className={cx("float-btn")}>
			<Controls.Button
				primary
				disable={!isChange}
				onClick={action}
			>
				{text ? text : title}
			</Controls.Button>
		</div>
	);
}
export default InfoLayout;
