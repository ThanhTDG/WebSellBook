import React, { useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "~/hooks/useGlobalState";
import InfoLayout from "~/layouts/InfoLayout";
import { authService } from "~/services";
import { setIsLogin } from "~/stores/actions";
import { actions, initStates, reducers } from "~/stores/cusReducer";
import PageConfig from "~/stores/pages";

function Logout() {
	const [state, dispatch] = useGlobalState();
	const [editMode, dispatchEditMode] = useReducer(reducers.EditModeReducer, initStates.editModeState);
	useEffect(() => {
		callApi();
	}, []);
	const navigate = useNavigate();
	const callApi = async () => {
		dispatchEditMode(actions.setStatusIsLoading());
		const response = await authService.logout();
		if (response) {
			dispatchEditMode(actions.setStatusIsSuccess());
			dispatch(actions.setIsLogin(false));
			navigate(PageConfig.login);
		} else {
			dispatchEditMode(actions.setStatusIsError());
		}
	};
	return (
		<InfoLayout
			editMode={editMode}
			dispatchEditMode={dispatchEditMode}
			showFeature={null}
		></InfoLayout>
	);
}

export default Logout;
