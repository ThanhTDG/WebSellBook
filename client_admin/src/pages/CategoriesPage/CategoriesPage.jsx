import classNames from "classnames/bind";
import React, { useEffect, useState } from "react";
import CategoryForm from "~/components/Form/CategoryForm";

import Loading from "~/components/Loading";
import CategoriesTab from "~/components/tab/CategoriesTab/CategoriesTab";
import LayoutHeaderButton from "~/layouts/LayoutHeaderButton";
import { getCategories, getCategoriesTree } from "~/services/categoriesService";
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

const cx = classNames.bind(styles);
function CategoriesPage() {
	const [state, dispatch] = useReducer(reducers.CategoriesReduce, initStates.categoriesState);
	const [isLoading, setIsLoading] = useState(false);
	const [category, setCategory] = useState({});

	useEffect(() => {
		fetchApi();
	}, []);
	const fetchApi = async () => {
		const [treeCategory, listCategory] = await Promise.all([getCategoriesTree(), getCategories()]);
		if (treeCategory && listCategory) {
			addId(treeCategory);
			dispatch(actions.setCategories([treeCategory, listCategory.docs]));
			setIsLoading(false);
		}
	};
	const handleCategoryChange = (id) => {
		setCategory({ ...state.list.find((item) => item.id === id) });
	};
	const handleChangeParent = (newId) => {
		setCategory((state) => ({
			...state,
			parent: state.list.find((item) => newId === item.id),
		}));
	};
	console.log(category);
	return (
		<InfoLayout showFeature={category}>
			<div className={cx("wrapper")}>
				<Loading isLoading={isLoading}>
					{state.tree && state.tree.length > 0 && (
						<div className={cx("category-tab")}>
							<CategoriesTab
								className={cx("categories")}
								fullScreen={true}
								treeCategories={state.tree}
								onChange={handleCategoryChange}
								idSelect={category.idSelect}
							/>
						</div>
					)}
					{!(category === {}) && (
						<CategoryForm
							category={category}
							categories={state}
							handleChangeParent={handleChangeParent}
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
