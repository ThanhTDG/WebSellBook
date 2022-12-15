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
import { actions } from "~/stores";

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
		const response = await login(values.username, values.password);
		if (response) {
			if (response.token) {
				setHandling({
					isSuccess: true,
					isLoading: false,
				});
			} else {
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
				<Controls.Button
					type="button"
					className={cx("btn-login")}
					primary
					onClick={handleGetProfile}
				>
					getProfile
				</Controls.Button>
			</div>
		</Form>
	);
}

export default LoginForm;
