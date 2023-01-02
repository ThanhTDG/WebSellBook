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
import * as initStates from "~/stores/initStates";
import Change from "~/components/Change";
import useForm from "~/hooks/useForm";
import * as categoriesService from "~/services/categoriesService";
import * as reducers from "~/stores/reducers";
import { useReducer } from "react";
import loadStatus from "~/stores/statusLoad";
import LoadingDialog from "../LoadingDialog";
import TextFelidCategory from "~/components/TextFelidCategory";
const { confirm } = Modal;
const cx = classNames.bind(styles);

function CreateCategory(props) {
	const { classNameBtn, categories, category, setCategory, fetchCategories } = props;
	const formCategory = useForm(category, false);
	const [editMode, dispatchEditMode] = useReducer(reducers.EditModeReducer, {
		...initStates.editModeState,
		enableEdit: true,
	});
	const { values, setValues, errors, setError, handleInputChange } = formCategory;
	const [isOpen, setOpen] = useState(false);
	const [openCategory, setOpenCategory] = useState(initStates.openCategory);
	const handleOpen = () => {
		if (!isOpen) {
			setValues(category);
			setCategory(null);
			setOpen(true);
		}
	};
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
				clearData();
			},
		});
	};
	const handleClose = () => {
		if (isOpen && editMode.isChange) {
			showConfirmExit();
		} else {
			closeDialog();
			clearData();
		}
	};
	const clearData = () => {
		dispatchEditMode(actions.setResetAll());
		setValues(category);
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

	const handleCreate = () => {
		createCategory();
	};
	const createCategory = async () => {
		dispatchEditMode(actions.setStatusIsLoading());
		const response = await categoriesService.createCategory(values);
		if (response) {
			await fetchCategories();
			dispatchEditMode(actions.setStatusIsSuccess());
			setCategory({ ...response });
			closeDialog();
		} else {
			dispatchEditMode(actions.setStatusIsError());
		}
	};
	const handleChangeParent = (newId) => {
		if (newId) {
			setValues({
				...values,
				parent: { ...categories.list.find((item) => item.id === newId) },
			});
		} else {
			setValues({
				...values,
				parent: "",
			});
		}
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
				className={cx("dialog")}
				title={constants.CREATE_CATEGORY}
				open={isOpen}
				destroyOnClose={true}
				onOk={handleCreate}
				okText={constants.ADD}
				cancelText={constants.CANCEL}
				onCancel={handleClose}
			>
				{values && (
					<div className={cx(openCategory.isOpen ? "wrapper" : "wrapper-expand")}>
						<CategoryForm
							className={cx("category-form")}
							handleChange={handleInputChange}
							category={values}
							PickParent={
								<TextFelidCategory
									label={constants.PARENT_CATEGORY}
									levelDisplay={values.level - 1}
									category={values.parent}
									handleIdChange={handleChangeParent}
									tree={categories.tree}
									list={categories.list}
									setCategory={setValues}
								/>
							}
						/>
						{/* <div className={cx(openCategory.isOpen ? "category-tab" : "none-display")}>
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
										oldValue={values.parent ? values.parent.name : ""}
										newValue={categories.list.find((item) => item.id === openCategory.newId).name}
									/>
								)}
								<div className={cx("feature")}>
									<Controls.Button
										outline
										className={cx("btn", "cancel")}
										onClick={handleCloseCategories}
									>
										{constants.CANCEL}
									</Controls.Button>
									{values.parent && (
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
											onClick={handlePickParent}
											className={cx("btn", "confirm")}
										>
											{constants.PICK}
										</Controls.Button>
									)}
								</div>
							</OutlinedBox>
						</div> */}
					</div>
				)}
			</Modal>
			<LoadingDialog
				editMode={editMode}
				dispatchEditMode={dispatchEditMode}
			/>
		</>
	);
}

export default CreateCategory;
