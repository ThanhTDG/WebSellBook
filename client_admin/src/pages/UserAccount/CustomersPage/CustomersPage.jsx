import * as React from "react";
import { useReducer } from "react";

import TabsCustomer from "~/components/tab/TabCustomer";
import InfoLayout from "~/layouts/InfoLayout";
import LayoutHeaderButton from "~/layouts/LayoutHeaderButton";
import { cusReducer } from "~/stores";

function CustomersPage() {
	const [editMode, dispatchEditMode] = useReducer(
		cusReducer.reducers.EditModeReducer,
		cusReducer.initStates.editModeState
	);
	return (
		<InfoLayout
			editMode={editMode}
			dispatchEditMode={dispatchEditMode}
			showFeature={null}
		>
			<TabsCustomer />;
		</InfoLayout>
	);
}

export default CustomersPage;
