import { responsiveArray } from "antd/es/_util/responsiveObserve";
import classNames from "classnames/bind";
import React, { useEffect, useState } from "react";
import { useReducer } from "react";
import { useParams } from "react-router-dom";
import Switch from "~/components/controls/Switch";
import FormProduct from "~/components/Form/FormProduct";
import Loading from "~/components/Loading";
import * as productServices from "~/services/productService";
import * as reducers from "~/stores/reducers";
import styles from "./viewProduct.module.scss";
import * as initStates from "~/stores/initStates";
import * as categoriesService from "~/services/categoriesService";
import InfoLayout from "~/layouts/InfoLayout";
import * as actions from "~/stores/actions";
import typeFeature from "~/stores/types/typeFeature";
const cx = classNames.bind(styles);
function ViewProduct() {
	const { id } = useParams();
	const [isLoading, setIsLoading] = useState(false);
	const [product, setProduct] = useState({});
	const [editMode, dispatchEditMode] = useReducer(reducers.EditModeReducer, initStates.editModeState);
	const [categories, dispatchCategories] = useReducer(reducers.CategoriesReduce, initStates.categoriesState);
	useEffect(() => {
		setIsLoading(true);
		fetchApi();
	}, []);
	const handleProduct = (result) => {
		if (result) {
			delete result._id;
			setProduct({
				...result,
				id: id,
			});
		}
	};
	const handleDelete = () => {};
	const handleUpdate = () => {};
	const fetchApi = async () => {
		const [responseProduct, responseCategories] = await Promise.all([
			productServices.getProductById(id),
			categoriesService.getCategories(),
		]);
		if (responseProduct && responseCategories) {
			handleProduct(responseProduct);
			dispatchCategories(actions.setCategories(responseCategories));
		}
		setIsLoading(false);
	};
	return (
		<InfoLayout
			id={id}
			editMode={editMode}
			dispatchEditMode={dispatchEditMode}
		>
			<Loading isLoading={isLoading}>
				<FormProduct
					editMode={editMode}
					dispatchEditMode={dispatchEditMode}
					isEdit={editMode.enableEdit}
					type={typeFeature.isEdit}
					product={product}
					setProduct={setProduct}
					categories={categories}
				/>
			</Loading>
		</InfoLayout>
	);
}

export default ViewProduct;
