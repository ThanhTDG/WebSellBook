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
import * as categoriesService from "~/services/categoryService";
import InfoLayout from "~/layouts/InfoLayout";
import * as actions from "~/stores/actions";
import typeFeature from "~/stores/types/typeFeature";
import useForm from "~/hooks/useForm";
const cx = classNames.bind(styles);
function ViewProduct() {
	const { id } = useParams();
	console.log(id);
	const [isLoading, setIsLoading] = useState(true);
	const [product, setProduct] = useState({});
	const form = useForm(product);
	const { values, setValues } = form;
	const [editMode, dispatchEditMode] = useReducer(reducers.EditModeReducer, initStates.editModeState);
	const [categories, dispatchCategories] = useReducer(reducers.CategoriesReduce, initStates.categoriesState);
	useEffect(() => {
		setIsLoading(true);
		fetchApi();
	}, []);
	const handleProduct = (result) => {
		setProduct(result);
		setValues(result);
	};
	const handleDelete = () => {};
	const updateProduct = async () => {
		dispatchEditMode(actions.setStatusIsLoading());
		let removeImage = [];
		if (values.images.length !== product.images.length) {
			removeImage = product.images.filter((imageCurrent) => values.images.indexOf(imageCurrent) === -1);
		}
		let response = null;
		let responseDeleteImage = {};
		if (removeImage.length > 0) {
			[response, responseDeleteImage] = await Promise.all([
				productServices.updateProduct(values, product.id),
				productServices.deleteImages(removeImage),
			]);
		} else {
			response = await productServices.updateProduct(values, product.id);
		}
		if (responseDeleteImage && response) {
			handleProduct(response);
			dispatchEditMode(actions.setStatusIsSuccess());
		} else {
			dispatchEditMode(actions.setStatusIsError());
		}
	};
	const handleUpdateProduct = () => {
		updateProduct();
	};
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
			onClickChange={handleUpdateProduct}
			handleDelete={handleDelete}
		>
			<Loading isLoading={isLoading}>
				<FormProduct
					editMode={editMode}
					dispatchEditMode={dispatchEditMode}
					isEdit={editMode.enableEdit}
					type={typeFeature.isEdit}
					form={form}
					product={product}
					setProduct={setProduct}
					categories={categories}
				/>
			</Loading>
		</InfoLayout>
	);
}

export default ViewProduct;
