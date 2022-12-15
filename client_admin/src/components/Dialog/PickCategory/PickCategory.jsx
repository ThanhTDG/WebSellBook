import { Button, Modal } from "antd";
import classNames from "classnames/bind";
import React from "react";
import { useState } from "react";

import CategoriesTab from "~/components/tab/CategoriesTab";
import styles from "./pickCategory.module.scss";
import CategoryForm from "~/components/Form/CategoryForm";
import { copyObject, FindLevelNode, renderTreeLevel } from "~/utils/util";
const cx = classNames.bind(styles);
function PickCategory(props) {
	const { categories, onChange, onOK, onCancel, category } = props;
	const [level, setLevel] = useState(2 - FindLevelNode(category.id, copyObject(categories.tree)));
	const [open, setOpen] = useState(false);
	const [newId, setNewID] = useState("");
	const handleSelect = (id) => {
		setNewID(id);
	};
	return (
		<div>
			<Button
				type="primary"
				onClick={() => setOpen(true)}
				disabled={level == 0}
			>
				Open Modal of 1000px width
			</Button>
			<Modal
				className={cx("wrapper")}
				title="Modal 1000px width"
				centered
				open={open}
				onOk={onOK}
				onCancel={onCancel}
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
						{newId !== category.parent && (
							<div className={cx("value-change")}>
								<div className={cx("old-value")}>
									{}
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
		</div>
	);
}

export default PickCategory;
