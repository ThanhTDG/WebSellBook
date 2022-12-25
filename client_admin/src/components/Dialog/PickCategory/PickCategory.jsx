import { Modal } from "antd";
import classNames from "classnames/bind";
import React from "react";
import { useState } from "react";

import CategoriesTab from "~/components/tab/CategoriesTab";
import styles from "./pickCategory.module.scss";
import CategoryForm from "~/components/Form/CategoryForm";
import { copyObject, FindLevelNode, renderTreeLevel } from "~/utils/util";
import Controls from "~/components/controls";
import { constants } from "~/stores";
import "./dialog.scss";
import Change from "~/components/Change";
const cx = classNames.bind(styles);
function PickCategory(props) {
	const {
		onOK,
		title = "Chọn",
		list,
		tree,
		className,
		currentValue,
		disabled,
		idVisible,
		displayText = constants.CHANGE,
		maxLevel,
	} = props;
	const [open, setOpen] = useState(false);
	const [newId, setNewID] = useState("");
	const handleSelect = (id) => {
		setNewID(id);
	};
	const handleOpen = () => {
		setOpen(true);
		setNewID("");
	};
	const handleClose = () => {
		setOpen(false);
	};
	return (
		<>
			<Controls.Button
				className={cx("btn-change", className)}
				primary
				onClick={handleOpen}
				disabled={disabled}
			>
				{displayText}
			</Controls.Button>
			<Modal
				className={cx("wrapper")}
				title={title}
				centered
				open={open}
				onOk={() => {
					handleClose();
					onOK(newId);
				}}
				okText={constants.CONFIRM}
				cancelText={constants.CANCEL}
				onCancel={handleClose}
			>
				<div className="layout">
					{tree && (
						<div className={cx("category-tab")}>
							<CategoriesTab
								tree={tree}
								list={list}
								maxLevel={maxLevel}
								idVisible={idVisible}
								sx={{ height: 400, flexGrow: 1, overflowY: "auto" }}
								onChange={handleSelect}
								idSelect={newId}
							/>
						</div>
					)}
					{newId && (
						<Change
							oldValue={currentValue ? currentValue.name : ""}
							newValue={newId && list.find((item) => item.id === newId).name}
						/>
					)}
				</div>
			</Modal>
		</>
	);
}

export default PickCategory;
