import React, { useEffect, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import { useState } from "react";

import styles from "./loginForm.module.scss";
import Controls from "~/components/controls";
import Hooks from "~/hooks";
import Form from "~/components/Form";
import { FormControl } from "@mui/material";
import { getProfile, login } from "~/services/authService";
import PageConfig from "~/stores/pages";
import Cookies from "js-cookie";
import { Window } from "@mui/icons-material";
import { useGlobalState } from "~/hooks/useGlobalState";
import { globalContext } from "~/stores/contexts";
import { actions, constants } from "~/stores";
import { initStates, reducers } from "~/stores/cusReducer";
import LoadingDialog from "~/components/Dialog/LoadingDialog";
import { useReducer } from "react";

const cx = classNames.bind(styles);
const initialUser = {
	username: "",
	password: "",
};
const stateHandling = {
	isLoading: false,
	isSuccess: false,
};
function LoginForm() {
	const navigate = useNavigate();
	const [editMode, dispatchEditMode] = useReducer(reducers.EditModeReducer, initStates.editModeState);
	const [handling, setHandling] = useState(stateHandling);
	const [globalState, dispatch] = useGlobalState(globalContext);
	const { values, setValues, errors, setError, handleInputChange } = Hooks.useForm(initialUser);
	const handleSubmit = (e) => {
		setHandling({
			...handling,
			isLoading: true,
		});
		e.preventDefault();
		handleLogin();
	};
	const handleLogin = async () => {
		dispatchEditMode(actions.setStatusIsLoading());
		const response = await login(values.username, values.password);
		if (response) {
			if (response.token) {
				dispatchEditMode(actions.setStatusIsSuccess());
				setHandling({
					isSuccess: true,
					isLoading: false,
				});
			} else {
				dispatchEditMode(actions.setStatusIsError());
				setHandling({
					isSuccess: false,
					isLoading: false,
				});
			}
		}
	};

	useEffect(() => {
		if (handling.isSuccess) {
			dispatch(actions.setIsLogin(true));
			navigate(PageConfig.home.route);
		} else {
		}
	}, [handling.isLoading, navigate]);
	const handleGetProfile = () => {
		getProfileAccount();
	};
	const getProfileAccount = async () => {
		const profile = await getProfile();
	};
	return (
		<>
			<Form onSubmit={handleSubmit}>
				<div className={cx("wrapper")}>
					<FormControl className={cx("form-control")}>
						<Controls.Input
							label="username"
							value={values.username}
							name="username"
							onChange={handleInputChange}
						/>
						<Controls.Input
							label="password"
							value={values.password}
							type="password"
							name="password"
							onChange={handleInputChange}
						/>
					</FormControl>
					<Controls.Button
						type="submit"
						className={cx("btn-login")}
						primary
					>
						Đăng nhập
					</Controls.Button>
				</div>
			</Form>
			<LoadingDialog
				editMode={editMode}
				dispatchEditMode={dispatchEditMode}
			/>
		</>
	);
}

export default LoginForm;
