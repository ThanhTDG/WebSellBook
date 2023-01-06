import React, { useReducer } from "react";
import TabAdmin from "~/components/tab/TabAdmin";
import InfoLayout from "~/layouts/InfoLayout";
import { cusReducer } from "~/stores";

function AccountAdminsPage() {
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
			<TabAdmin />
		</InfoLayout>
	);
}

export default AccountAdminsPage;
