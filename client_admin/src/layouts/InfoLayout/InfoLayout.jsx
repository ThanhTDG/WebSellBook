import React, { useState } from "react";
import classNames from "classnames/bind";
import { Modal } from "antd";
import { useEffect } from "react";

import styles from "./InfoLayout.module.scss";
import featureType from "~/stores/types/featureType";
import Header from "../components/HeaderCustom/Header";
import { actions, constants } from "~/stores";
import Controls from "~/components/controls";
import { icons } from "~/assets/images";
import { getKey } from "~/utils/util";
import PageConfig from "~/stores/pages";
import LoadingDialog from "~/components/Dialog/LoadingDialog";

const cx = classNames.bind(styles);

const { confirm } = Modal;

function InfoLayout(props) {
	const {
		editMode = null,
		handleDelete,
		dispatchEditMode = null,
		disableDelete = false,
		type = featureType.isEdit,
		showFeature = true,
		onClickChange = false,
		addAction,
		children,
		textConfirm,
		typeModel = "",
	} = props;
	const [navbar, setNavbar] = useState(false);
	let pageName = "";
	const handleIsEditChange = (e) => {
		if (editMode && editMode.isChange) {
			confirm({
				title: <div className={cx("title-confirm")}>{"Thoát khỏi chế độ chỉnh sửa ?"}</div>,
				content: `Bạn muốn thoát khỏi chế độ chỉnh sửa ${typeModel} hiện tại? Lưu ý tiến độ và những gì bạn thay đổi sẽ bị loại bỏ !!!`,
				centered: true,
				onOk: () => {
					console.log("log");
					dispatchEditMode(actions.setResetAll());
				},
			});
		} else {
			dispatchEditMode(actions.setEnableEdit(e.target.checked));
		}
	};
	const getPageName = () => {
		let string = "";
		let path = window.location.pathname;
		if (path == "/") {
			path = PageConfig.home.route;
		}
		let key = getKey("route", path);
		return PageConfig[key].label;
	};
	pageName = getPageName();
	const actionFeature = {
		[featureType.isNew]: addAction,
		[featureType.isEdit]: handleIsEditChange,
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
			case featureType.isEdit:
				return isEdit && action;
			case featureType.isNew:
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
	window.addEventListener("scroll", changeNavbar);
	return (
		<div className={cx("wrapper")}>
			<div className={cx("header")}>
				<Header
					showLogo={true}
					left={<div className={cx(navbar ? "title" : "non-display", "page-name")}>{pageName}</div>}
					right={
						<div className={cx(navbar ? "title" : "non-display", "feature")}>
							{showFeature && (
								<TypeFeature
									type={type}
									value={editMode ? editMode.enableEdit : false}
									onChange={actionFeature[type]}
									onClickDelete={onClickDelete}
								/>
							)}
						</div>
					}
				/>
			</div>
			<div className={cx("body")}>
				<div className={cx("future-manager")}>
					<div className={cx("future", "page-name")}>{pageName}</div>
					{showFeature && (
						<TypeFeature
							type={type}
							value={editMode ? editMode.enableEdit : false}
							onChange={actionFeature[type]}
							onClickDelete={onClickDelete}
						/>
					)}
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
	const { type, onChange, value, onClickDelete } = props;
	switch (type) {
		case featureType.isEdit:
			return (
				<div className={cx("edit-n-delete")}>
					{onClickDelete && (
						<Controls.Button
							rightIcon={icons.Button("").delete}
							primary
							onClick={onClickDelete}
							className={cx("btn-delete")}
						>
							{constants.DELETE}
						</Controls.Button>
					)}
					<div className={cx("edit", value ? "enable" : "")}>
						<div className={cx("label-edit", value ? "active" : "")}>{constants.EDIT}</div>
						<div className={cx("switch-edit")}>
							<Controls.Switch
								checked={value}
								onChange={onChange}
							/>
						</div>
					</div>
				</div>
			);
		case featureType.isNew:
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
		case featureType.isEdit:
			title = constants.SAVE_CHANGE;
			break;
		case featureType.isNew:
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
