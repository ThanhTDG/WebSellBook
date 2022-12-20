import classNames from "classnames/bind";
import React, { useEffect, useState } from "react";
import CategoryForm from "~/components/Form/CategoryForm";

import Loading from "~/components/Loading";
import CategoriesTab from "~/components/tab/CategoriesTab/CategoriesTab";
import LayoutHeaderButton from "~/layouts/LayoutHeaderButton";
import * as categoriesService from "~/services/categoriesService";
import ProviderContext from "~/stores/ProviderContext";
import styles from "./categoryPage.module.scss";
import * as initStates from "~/stores/initStates";
import * as reducers from "~/stores/reducers";
import * as contexts from "~/stores/contexts";
import { useGlobalState } from "~/hooks/useGlobalState";
import { actions } from "~/stores";
import { useReducer } from "react";
import { renderTreeLevel } from "~/utils/util";
import InfoLayout from "~/layouts/InfoLayout";
import hooks from "~/hooks";
import { useMemo } from "react";
import CreateCategory from "~/components/Dialog/CreateCategory";

const cx = classNames.bind(styles);
function CategoriesPage() {
	const [categories, dispatchCategories] = useReducer(reducers.CategoriesReduce, initStates.categoriesState);
	const [isLoading, setIsLoading] = useState(false);
	const [editMode, dispatchEditMode] = useReducer(reducers.EditModeReducer, initStates.editModeState);
	const [category, setCategory] = useState({});
	let displayCategory = Object.keys(category).length !== 0;

	const fetchApi = async () => {
		const [treeCategory, listCategory] = await Promise.all([
			categoriesService.getCategoriesTree(),
			categoriesService.getCategories(),
		]);
		if (treeCategory && listCategory) {
			addId(treeCategory);
			dispatchCategories(actions.setCategories([treeCategory, listCategory.docs]));
			setIsLoading(false);
		}
	};
	const fetchUpdateCategory = async () => {
		const response = await categoriesService.updateCategory(editMode.value);
		if (response) {
		} else {
		}
	};

	useEffect(() => {
		fetchApi();
	}, []);
	const handleCategoryChange = (id) => {
		setCategory({ ...categories.list.find((item) => item.id === id) });
	};
	const handleChangeParent = (newId) => {
		setCategory((state) => ({
			...state,
			parent: state.list.find((item) => newId === item.id),
		}));
	};
	const handleUpdateCategory = () => {};

	const MemoCategoriesTab = useMemo(() => {
		return (
			categories.tree &&
			categories.tree.length > 0 && (
				<div className={cx("category-tab")}>
					{console.log("rerender")}
					<CategoriesTab
						className={cx("tree-view-categories")}
						fullScreen={true}
						treeCategories={categories.tree}
						onChange={handleCategoryChange}
						idSelect={category.id ? category.id : ""}
						CreateCategory={
							<CreateCategory
								editMode={editMode}
								dispatchEditMode={dispatchEditMode}
								categories={categories}
								category={editMode.value}
							/>
						}
					/>
				</div>
			)
		);
	}, [categories, category]);
	return (
		<InfoLayout
			showFeature={displayCategory}
			editMode={editMode}
			dispatchEditMode={dispatchEditMode}
		>
			<div className={cx("wrapper")}>
				<Loading isLoading={isLoading}>
					{MemoCategoriesTab}
					{displayCategory && (
						<CategoryForm
							editMode={editMode}
							dispatchEditMode={dispatchEditMode}
							category={category}
							categories={categories}
							canEdit={editMode.enableEdit}
						/>
					)}
				</Loading>
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
