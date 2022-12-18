import React from "react";

import styles from "./newProduct.module.scss";
import classNames from "classnames/bind";
import FormProduct from "~/components/Form/FormProduct";
import InfoLayout from "~/layouts/InfoLayout";
const cx = classNames.bind(styles);

function NewProduct() {
	return (
		<InfoLayout showFeature={false}>
			<FormProduct />
		</InfoLayout>
	);
}

export default NewProduct;
