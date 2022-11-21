import * as React from "react";
import Controls from "~/components/controls/";
import classNames from "classnames/bind";

import { TabProduct } from "~/components/tab/product";
import { ProductMgtProvider } from "~/stores";
import styles from "./products.module.scss";
import PageConfig from "~/config/pages";
const cx = classNames.bind(styles);

function Products() {
	return (
		<div className={cx("wrapper")}>
			<div className={cx("future-manager")}>
				<Controls.Button
					primary
					to={PageConfig.newProduct.route}
					target={"_blank"}
				>
					Thêm mới
				</Controls.Button>
			</div>
			<div>
				<TabProduct />
				{/* <ProductMgtProvider>
				
				</ProductMgtProvider> */}
			</div>
		</div>
	);
}

export default Products;
