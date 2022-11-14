import * as React from "react";
import Button from "~/components/Button";
import { TabProduct } from "~/components/tab/product";
import { ProductMgtProvider } from "~/stores";
import styles from "./products.module.scss";
import classNames from "classnames/bind";
import PageConfig from "~/config/pages";
const cx = classNames.bind(styles);

function Products() {
	return (
		<div className={cx("wrapper")}>
			<div className={cx("future-manager")}>
				<Button primary to={PageConfig.newProduct.route}>
					{" "}
					Thêm mới{" "}
				</Button>
			</div>
			<div>
				<ProductMgtProvider>
					<TabProduct />
				</ProductMgtProvider>
			</div>
		</div>
	);
}

export default Products;
