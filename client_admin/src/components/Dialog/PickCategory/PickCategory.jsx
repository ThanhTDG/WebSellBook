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
const cx = classNames.bind(styles);
function PickCategory(props) {
	const { categories, onOK, title = "Chọn", category } = props;
	const [level, setLevel] = useState(2 - FindLevelNode(category.id, copyObject(categories.tree)));
	const [open, setOpen] = useState(false);
	const [newId, setNewID] = useState("");
	const handleSelect = (id) => {
		setNewID(id);
	};
	const handleOpen = () => {
		console.log("test ");
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	return (
		<>
			<Controls.Button
				className={cx("btn-change")}
				primary
				onClick={handleOpen}
				disabled={level == 0}
			>
				{constants.CHANGE}
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
					{categories.tree && categories.tree.length > 0 && (
						<div className={cx("category-tab")}>
							<CategoriesTab
								sx={{ height: 400, flexGrow: 1, overflowY: "auto" }}
								treeCategories={renderTreeLevel(copyObject(categories.tree), level)}
								onChange={handleSelect}
								idSelect={newId}
							/>
						</div>
					)}
					<div>
						{newId && category.parent && newId !== category.parent.id && (
							<div className={cx("value-change")}>
								<div className={cx("old-value")}>
									Thay đổi từ:{" "}
									{category.parent ? (category.parent.name ? category.parent.name : "Lỗi gì đấy") : " không có"}
								</div>
								<div className={cx("new-value")}>
									Thành: {newId && categories.list.find((item) => item.id === newId).name}
								</div>
							</div>
						)}
					</div>
				</div>
			</Modal>
		</>
	);
}

export default PickCategory;
