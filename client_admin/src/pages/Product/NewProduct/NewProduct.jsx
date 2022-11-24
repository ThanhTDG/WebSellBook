import React from "react";

import styles from "./newProduct.module.scss";
import classNames from "classnames/bind";
import FormProduct from "~/components/Form/FormProduct";
const cx = classNames.bind(styles);

function NewProduct() {
	return <FormProduct></FormProduct>;
}

export default NewProduct;
