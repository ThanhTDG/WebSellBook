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

const cx = classNames.bind(styles);
function CategoriesPage() {
	const [state, dispatch] = useReducer(reducers.CategoriesReduce, initStates.categoriesState);
	const [isLoading, setIsLoading] = useState(false);
	const [idSelect, setIdSelect] = useState("");
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
	return (
		<LayoutHeaderButton className={cx("wrapper")}>
			<Loading isLoading={isLoading}>
				{state.tree && state.tree.length > 0 && (
					<div className={cx("category-tab")}>
						<CategoriesTab
							treeCategories={state.tree}
							onChange={setIdSelect}
							idSelect={idSelect}
						/>
					</div>
				)}
				{state.list &&
					state.list.length > 0 &&
					state.list.map(
						(category) =>
							category.id === idSelect && (
								<CategoryForm
									data={category}
									listCategory={state}
								/>
							)
					)}
			</Loading>
		</LayoutHeaderButton>
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
