import React from "react";
import { useReducer } from "react";
import ProfileForm from "~/components/Form/ProfileForm";
import InfoLayout from "~/layouts/InfoLayout";
import { cusReducer } from "~/stores";

function AccountAdminPage() {
	const [editMode, dispatchEditMode] = useReducer(
		cusReducer.reducers.EditModeReducer,
		cusReducer.initStates.editModeState
	);

	return (
		<InfoLayout
			editMode={editMode}
			dispatchEditMode={dispatchEditMode}
			showEdit={false}
		>
			<ProfileForm
				editMode={editMode}
				dispatchEditMode={dispatchEditMode}
			/>
		</InfoLayout>
	);
}

export default AccountAdminPage;
