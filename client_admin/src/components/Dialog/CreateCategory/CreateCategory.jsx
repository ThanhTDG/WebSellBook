import React from "react";
import { useState } from "react";
import classNames from "classnames/bind";

import Controls from "~/components/controls";
import styles from "./createCategory.module.scss";
import Modal from "antd/es/modal/Modal";
import { icons } from "~/assets/images";
import CategoryForm from "~/components/Form/CategoryForm";
import CategoriesTab from "~/components/tab/CategoriesTab";
import { actions, constants } from "~/stores";
import OutlinedBox from "~/components/OutlinedBox";
import * as initState from "~/stores/initStates";
import Change from "~/components/Change";
const { confirm } = Modal;
const cx = classNames.bind(styles);

function CreateCategory(props) {
	const { classNameBtn, categories, editMode, dispatchEditMode, category } = props;
	const [isOpen, setOpen] = useState(false);
	const [openCategory, setOpenCategory] = useState(initState.openCategory);
	const handleOpen = () => {
		if (!isOpen) {
			setOpen(true);
			console.log(editMode, "before set");
			dispatchEditMode(actions.setNewValue(initState.category));
			console.log(editMode, "after set");
		}
	};
	console.log(editMode.value);
	const closeDialog = () => {
		setOpen(false);
		handleCloseCategories();
	};
	const showConfirmExit = () => {
		confirm({
			title: <div className={cx("title-confirm")}> Bạn muốn thoát khỏi thêm danh mục ?</div>,
			content: "Bạn muốn thoát khỏi thêm danh mục? Lưu ý tiến độ hiện tại của bạn sẽ bị hủy",
			onOk() {
				closeDialog();
			},
		});
	};
	const handleClose = () => {
		if (isOpen && JSON.stringify(category) !== JSON.stringify(initState.category)) {
			showConfirmExit();
		} else {
			closeDialog();
		}
	};
	const handleOpenCategories = () => {
		setOpenCategory((state) => ({
			newId: category.parent ? category.parent.id : null,
			isOpen: true,
		}));
	};
	const handleCloseCategories = () => {
		setOpenCategory({
			newId: null,
			isOpen: false,
		});
	};
	const handleOpenPickCategory = () => {
		if (openCategory.isOpen) {
			handleCloseCategories();
		} else {
			handleOpenCategories();
		}
	};

	const handleDeleteParent = () => {
		handleCloseCategories();
		dispatchEditMode(actions.setValueChange({ ...category, parent: null }));
	};
	const handleCreate = () => {};
	const handlePickChange = (value) => {
		setOpenCategory((state) => ({
			...state,
			newId: value,
		}));
	};
	const handleChangeParent = () => {
		dispatchEditMode(
			actions.setValueChange({
				...category,
				parent: { ...categories.list.find((item) => item.id === openCategory.newId) },
			})
		);
		handleCloseCategories();
	};
	return (
		<>
			<Controls.Button
				primary
				className={classNameBtn}
				rightIcon={icons.Button("").addBox}
				onClick={handleOpen}
			>
				{constants.ADD}
			</Controls.Button>
			<Modal
				className={cx("dialog", !isOpen && "none-display")}
				title={constants.CREATE_CATEGORY}
				centered
				open={isOpen}
				onOk={handleCreate}
				okText={constants.ADD}
				cancelText={constants.CANCEL}
				onCancel={handleClose}
			>
				<div className={cx(openCategory.isOpen ? "wrapper" : "wrapper-expand")}>
					<CategoryForm
						className={cx("category-form")}
						categories={categories}
						category={category}
						editMode={editMode}
						dispatchEditMode={dispatchEditMode}
						canEdit={editMode.isNew}
						PickParent={
							<Controls.Button
								primary
								onClick={handleOpenPickCategory}
							>
								{constants.CHANGE}
							</Controls.Button>
						}
					/>
					<div className={cx(openCategory.isOpen ? "category-tab" : "none-display")}>
						<OutlinedBox
							classNameHeader={cx("outline-outside")}
							label={constants.PICK_PARENT_CATEGORY}
							className={cx("outline-inside")}
						>
							<CategoriesTab
								className={cx("tree-view")}
								treeCategories={categories.tree}
								idSelect={openCategory.newId}
								onChange={handlePickChange}
							/>
							{openCategory.newId !== null && (
								<Change
									className={cx("change")}
									oldValue={category.parent ? category.parent.name : ""}
									newValue={categories.list.find((item) => item.id === openCategory.newId).name}
								/>
							)}
							<div className={cx("feature")}>
								<Controls.Button
									outline
									className={cx("btn", "cancel")}
									onClick={handleOpenPickCategory}
								>
									{constants.CANCEL}
								</Controls.Button>
								{category.parent && (
									<Controls.Button
										primary
										onClick={handleDeleteParent}
										className={cx("btn", "delete")}
									>
										{constants.DELETE}
									</Controls.Button>
								)}
								{openCategory.newId !== null && (
									<Controls.Button
										primary
										onClick={handleChangeParent}
										className={cx("btn", "confirm")}
									>
										{constants.PICK}
									</Controls.Button>
								)}
							</div>
						</OutlinedBox>
					</div>
				</div>
			</Modal>
		</>
	);
}

export default CreateCategory;
