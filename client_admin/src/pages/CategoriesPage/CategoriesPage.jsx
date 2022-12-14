import classNames from "classnames/bind";
import React, { useEffect, useState } from "react";
import CategoryForm from "~/components/Form/CategoryForm";

import Loading from "~/components/Loading";
import CategoriesTab from "~/components/tab/CategoriesTab/CategoriesTab";
import * as categoriesService from "~/services/categoryService";
import styles from "./categoryPage.module.scss";
import * as initStates from "~/stores/initStates";
import * as reducers from "~/stores/reducers";
import { actions, constants } from "~/stores";
import { useReducer } from "react";
import InfoLayout from "~/layouts/InfoLayout";
import CreateCategory from "~/components/Dialog/CreateCategory";
import useForm from "~/hooks/useForm";
import LoadingDialog from "~/components/Dialog/LoadingDialog";
import TextFelidCategory from "~/components/TextFelidCategory";
import { deepCategory } from "~/utils/util";

const cx = classNames.bind(styles);
function CategoriesPage() {
	const [categories, dispatchCategories] = useReducer(reducers.CategoriesReduce, initStates.categoriesState);
	const [isLoading, setIsLoading] = useState(false);
	const [editMode, dispatchEditMode] = useReducer(reducers.EditModeReducer, initStates.editModeState);
	const [category, setCategory] = useState(null);
	const formCategory = useForm({}, false);
	const { values, setValues, errors, setError, handleInputChange } = formCategory;

	const fetchApi = async () => {
		setIsLoading(true);
		const [treeCategory, listCategory] = await Promise.all([
			categoriesService.getCategoriesTree(),
			categoriesService.getCategoriesList(),
		]);
		if (treeCategory && listCategory) {
			dispatchCategories(actions.setCategories([treeCategory, listCategory.docs]));
			dispatchEditMode(actions.setResetAll());
		}
		setIsLoading(false);
	};
	useEffect(() => {
		fetchApi();
	}, []);
	useEffect(() => {
		if (!editMode.enableEdit) {
			setValues(category);
			return;
		}
		if (JSON.stringify(values) === JSON.stringify(category)) {
			dispatchEditMode(actions.setIsChange(false));
		} else {
			dispatchEditMode(actions.setIsChange(true));
		}
	}, [editMode.enableEdit, values]);
	const emptyFunction = () => {
		dispatchEditMode(actions.setIsChange(true));
	};
	const handleDeleteCategory = () => {
		deleteCategory();
	};
	const handleUpdateCategory = () => {
		updateCategory();
	};
	const updateCategory = async () => {
		dispatchEditMode(actions.setStatusIsLoading());
		const response = await categoriesService.updateCategory(values);
		if (response) {
			await fetchApi();
			dispatchEditMode(actions.setStatusIsSuccess());
			setCategory(response);
		} else {
			dispatchEditMode(actions.setStatusIsError());
		}
	};
	const deleteCategory = async () => {
		dispatchEditMode(actions.setStatusIsLoading());
		const response = await categoriesService.deleteCategory(category.id);
		if (response) {
			await fetchApi();
			dispatchEditMode(actions.setStatusIsSuccess());
			setCategory(null);
		} else {
			dispatchEditMode(actions.setStatusIsError());
		}
	};
	const handleCategoryChange = (id) => {
		let itemFind = { ...categories.list.find((item) => item.id === id) };
		if (itemFind.parent) {
			itemFind = {
				...itemFind,
				parent: { ...categories.list.find((item) => item.id === itemFind.parent.id) },
			};
		}
		dispatchEditMode(actions.setResetAll());
		setCategory(itemFind);
		setValues(itemFind);
	};

	const handleChangeParent = (newId) => {
		if (newId) {
			setValues({
				...values,
				parent: { ...categories.list.find((item) => item.id === newId) },
			});
			dispatchEditMode(actions.setIsChangeNEdit());
		} else {
			emptyFunction();
			let temp = { ...values };
			delete temp.parent;
			setValues({
				...temp,
			});
		}
	};
	let displayCategory = category && !editMode.isNew;
	let levelPick = deepCategory(category, categories.list);
	let display = editMode.enableEdit ? values : category;
	return (
		<InfoLayout
			showFeature={displayCategory}
			current={category}
			newValue={values}
			editMode={editMode}
			onClickChange={handleUpdateCategory}
			dispatchEditMode={dispatchEditMode}
			handleDelete={handleDeleteCategory}
			typeModel={constants.CATEGORY.toLocaleLowerCase()}
		>
			<div className={cx("wrapper")}>
				<div className={cx("category-tab")}>
					<Loading isLoading={isLoading}>
						<CategoriesTab
							className={cx("tree-view-categories")}
							list={categories.list}
							tree={categories.tree}
							fullScreen={true}
							onChange={handleCategoryChange}
							idSelect={category ? category.id : ""}
							CreateCategory={
								<CreateCategory
									fetchCategories={fetchApi}
									categories={categories}
									category={initStates.category}
									setCategory={setCategory}
								/>
							}
						/>
					</Loading>
				</div>
				{displayCategory && (
					<div className={cx("display-form")}>
						<CategoryForm
							handleChange={editMode.enableEdit ? handleInputChange : emptyFunction}
							className={cx("form-category")}
							category={display}
							PickParent={
								<TextFelidCategory
									label={constants.PARENT_CATEGORY}
									category={display.parent ? categories.list.find((item) => item.id === display.parent.id) : null}
									handleIdChange={handleChangeParent}
									list={categories.list}
									tree={categories.tree}
									idVisible={[display.id, display.parent ? display.parent.id : ""]}
									disabled={constants.MAX_LEVEL - levelPick === 0}
									levelDisplay={constants.MAX_LEVEL - levelPick - 1}
								/>
							}
						/>
					</div>
				)}
			</div>
		</InfoLayout>
	);
}
function addId(array) {
	return array.forEach((itemData) => {
		itemData.id = itemData._id;
		if (itemData.children && itemData.children.length > 0) {
			addId(itemData.children);
		}
	});
}

export default CategoriesPage;
