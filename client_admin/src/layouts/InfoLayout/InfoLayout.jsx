import React, { useState } from "react";
import classNames from "classnames/bind";

import styles from "./InfoLayout.module.scss";
import { useEffect } from "react";
import featureType from "~/stores/types/featureType";
import Header from "../components/HeaderCustom/Header";
import { actions, constants } from "~/stores";
import Controls from "~/components/controls";
import { icons } from "~/assets/images";
import { getKey } from "~/utils/util";
import PageConfig from "~/stores/pages";

const cx = classNames.bind(styles);

function InfoLayout(props) {
	const {
		data = null,
		newData = null,
		editMode,
		dispatchEditMode,
		type = featureType.isEdit,
		showFeature = true,
		onClickChange = true,
		addAction,
		children,
	} = props;
	const [navbar, setNavbar] = useState(false);
	let pageName = "";
	const handleIsEditChange = (e) => {
		dispatchEditMode(actions.setEnableEdit(e.target.checked));
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
						/>
					)}
				</div>
				<div className={cx("content", editMode ? editMode.enableEdit : false && onClickChange ? "more-bottom" : "")}>
					{children}
				</div>
				{displayAction(type, editMode ? editMode.enableEdit : false, onClickChange) && (
					<TypeAction
						isChange={editMode.isChange}
						type={type}
						action={onClickChange}
					/>
				)}
			</div>
		</div>
	);
}

function TypeFeature(props) {
	const { type, onChange, value } = props;
	switch (type) {
		case featureType.isEdit:
			return (
				<div className={cx("edit", value ? "enable" : "")}>
					<div className={cx("label-edit", value ? "active" : "")}>{constants.EDIT}</div>
					<div className={cx("switch-edit")}>
						<Controls.Switch
							checked={value}
							onChange={onChange}
						/>
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
	const { action, type, isChange } = props;
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
				{title}
			</Controls.Button>
		</div>
	);
}
export default InfoLayout;
