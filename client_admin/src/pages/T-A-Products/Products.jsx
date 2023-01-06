import * as React from "react";
import Controls from "~/components/controls/";
import classNames from "classnames/bind";

import { TabProduct } from "~/components/tab/Products";
import PageConfig from "~/stores/pages";
import LayoutHeaderButton from "~/layouts/LayoutHeaderButton";
import { constants, cusReducer } from "~/stores";
import { useNavigate } from "react-router-dom";
import InfoLayout from "~/layouts/InfoLayout";
import typeFeature from "~/stores/types/typeFeature";
import { useReducer } from "react";
function Products() {
	const [editMode, dispatchEditMode] = useReducer(
		cusReducer.reducers.EditModeReducer,
		cusReducer.initStates.editModeState
	);
	const navigate = useNavigate();
	const handleNewProduct = () => {
		window.open(PageConfig.newProduct.route, "_blank");
	};
	return (
		<InfoLayout
			editMode={editMode}
			dispatchEditMode={dispatchEditMode}
			addAction={handleNewProduct}
			type={typeFeature.isNew}
			showAction={false}
		>
			<TabProduct />
		</InfoLayout>
	);
}

export default Products;
