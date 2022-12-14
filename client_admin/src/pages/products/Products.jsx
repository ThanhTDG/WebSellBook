import * as React from "react";
import Controls from "~/components/controls/";
import classNames from "classnames/bind";

import { TabProduct } from "~/components/tab/Products";
import PageConfig from "~/stores/pages";
import LayoutHeaderButton from "~/layouts/LayoutHeaderButton";
import { constants } from "~/stores";
function Products() {
	return (
		<LayoutHeaderButton
			lastComp={
				<Controls.Button
					primary
					to={PageConfig.newProduct.route}
					target={"_blank"}
				>
					{constants.ADD_NEW}
				</Controls.Button>
			}
		>
			<TabProduct />
		</LayoutHeaderButton>
	);
}

export default Products;
