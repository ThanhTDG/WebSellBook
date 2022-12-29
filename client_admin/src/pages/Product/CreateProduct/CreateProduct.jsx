import React, { useReducer } from "react";

import styles from "./createProduct.module.scss";
import classNames from "classnames/bind";
import FormProduct from "~/components/Form/FormProduct";
import InfoLayout from "~/layouts/InfoLayout";
import * as initStates from "~/stores/initStates";
import * as reducers from "~/stores/reducers";
import typeFeature from "~/stores/types/typeFeature";
import * as categoriesService from "~/services/categoriesService";
import { actions } from "~/stores";
import { useEffect } from "react";
import { useState } from "react";
import Loading from "~/components/Loading";
const cx = classNames.bind(styles);

function CreateProduct() {
	const [editMode, dispatchEditMode] = useReducer(reducers.EditModeReducer, initStates.editModeState);
	const [categories, dispatchCategories] = useReducer(reducers.CategoriesReduce, initStates.categoriesState);
	const [isLoading, setIsLoading] = useState(false);
	const [product, setProduct] = useState(initStates.product);
	useEffect(() => {
		fetchApi();
		setIsLoading(true);
	}, []);
	const fetchApi = async () => {
		const response = await categoriesService.getCategories();
		if (response) {
			dispatchCategories(actions.setCategories(response));
		}
		setIsLoading(false);
	};
	return (
		<InfoLayout
			editMode={editMode}
			dispatchEditMode={dispatchEditMode}
			showFeature={false}
		>
			<Loading isLoading={isLoading}>
				<FormProduct
					editMode={editMode}
					dispatchEditMode={dispatchEditMode}
					isEdit={true}
					type={typeFeature.isNew}
					product={product}
					setProduct={setProduct}
					categories={categories}
				/>
			</Loading>
		</InfoLayout>
	);
}

export default CreateProduct;
