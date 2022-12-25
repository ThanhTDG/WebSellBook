import React, { useReducer } from "react";

import styles from "./createProduct.module.scss";
import classNames from "classnames/bind";
import FormProduct from "~/components/Form/FormProduct";
import InfoLayout from "~/layouts/InfoLayout";
import * as initStates from "~/stores/initStates";
import * as reducers from "~/stores/reducers";
import featureType from "~/stores/types/featureType";
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
					type={featureType.isNew}
					product={initStates.product}
					categories={categories}
				/>
			</Loading>
		</InfoLayout>
	);
}

export default CreateProduct;
