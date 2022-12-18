import * as React from "react";
import Controls from "~/components/controls/";
import classNames from "classnames/bind";

import { TabProduct } from "~/components/tab/Products";
import PageConfig from "~/stores/pages";
import LayoutHeaderButton from "~/layouts/LayoutHeaderButton";
import { constants } from "~/stores";
import { useNavigate } from "react-router-dom";
import InfoLayout from "~/layouts/InfoLayout";
import featureType from "~/stores/types/featureType";
function Products() {
	const navigate = useNavigate();
	const handleNewProduct = () => {
		window.open(PageConfig.newProduct.route, "_blank");
		console.log("isClick");
	};
	return (
		<InfoLayout
			addAction={handleNewProduct}
			type={featureType.isNew}
		>
			<TabProduct />
		</InfoLayout>
	);
}

export default Products;
