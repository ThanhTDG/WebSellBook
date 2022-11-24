import * as React from "react";
import Controls from "~/components/controls/";
import classNames from "classnames/bind";

import { TabProduct } from "~/components/tab/Products";
import { ProductMgtProvider } from "~/stores";
import globalStyles from "~/pages/stylePages/pagesTabTable.module.scss";
import localStyles from "./products.module.scss";
import PageConfig from "~/stores/pages";
import { getKey } from "~/utils/util";
const gcx = classNames.bind(globalStyles);
const lcx = classNames.bind(localStyles);
function Products() {
	let key = getKey("route", window.location.pathname);
	let label = "";
	if (key) {
		label = PageConfig[key].label;
	}
	return (
		<div className={gcx("wrapper")}>
			<div className={gcx("future-manager")}>
				<h2>{label}</h2>
				<Controls.Button
					primary
					to={PageConfig.newProduct.route}
					target={"_blank"}
				>
					Thêm mới
				</Controls.Button>
			</div>
			<div className={gcx("content")}>
				<TabProduct />
			</div>
		</div>
	);
}

export default Products;
