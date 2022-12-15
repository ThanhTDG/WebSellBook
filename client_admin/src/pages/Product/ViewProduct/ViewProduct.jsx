import { responsiveArray } from "antd/es/_util/responsiveObserve";
import classNames from "classnames/bind";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Switch from "~/components/controls/Switch";
import FormProduct from "~/components/Form/FormProduct";
import Loading from "~/components/Loading";
import { getProductById } from "~/services/productService";

import styles from "./viewProduct.module.scss";

const cx = classNames.bind(styles);
function ViewProduct() {
	const { id } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [product, setProduct] = useState({});
	const [isEdit, setIsEdit] = useState(false);
	useEffect(() => {
		const fetchApi = async () => {
			let response = await getProductById({ id: id });
			handleProduct(response);
			setIsLoading(false);
		};
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

	return (
		<div className={cx("wrapper")}>
			<div className={cx("future-manager")}>
				<h2>Sách</h2>
				<div>
					<Switch
						checked={isEdit}
						onChange={() => {
							setIsEdit(!isEdit);
						}}
					/>
				</div>
			</div>
			<div className={cx("content")}>
				{isLoading ? (
					<Loading
						size={25}
						height={500}
					/>
				) : (
					<FormProduct
						edit={isEdit}
						initialValues={product}
					/>
				)}
			</div>
		</div>
	);
}

export default ViewProduct;
