import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { privateRoutes, publicRoutes } from "~/stores/routes/index.js";
import { Fragment, useEffect, useState } from "react";
import classNames from "classnames/bind";

import { DefaultLayout } from "~/layouts";
import PageConfig from "./stores/pages";
import { useGlobalState } from "./hooks/useGlobalState";
import { globalContext } from "./stores/contexts";
import Loading from "./components/Loading";
import { getProfile } from "./services/authService";
import { actions } from "./stores";
import styles from "./app.module.scss";
import { getPermission } from "./services/roleService";
import products from "./utils/fake";
import { fakeSellBook } from "./utils/util";

const cx = classNames.bind(styles);
function App() {
	const [state, dispatch] = useGlobalState();
	const [isLoading, setIsLoading] = useState(true);
	const setPage = (route, index) => {
		const Page = route.component;
		let Layout = DefaultLayout;
		if (route.layout) {
			Layout = route.layout;
		} else if (route.layout === null) {
			Layout = Fragment;
		}
		return (
			<Route
				key={index}
				path={route.path}
				element={
					<Layout>
						<Page />
					</Layout>
				}
			/>
		);
	};
	useState(() => {
		const checkLogin = async () => {
			const [profile, permissions] = await Promise.all([getProfile(), getPermission()]);
			console.log(profile, permissions);
			if (profile && permissions) {
				dispatch(
					actions.setLoginNInfo({
						profile: profile,
						permissions: permissions.docs,
					})
				);
			}
			setIsLoading(false);
		};
		checkLogin();
	}, []);

	const getPathsPrivate = () => {
		return <Routes>{privateRoutes.map((route, index) => setPage(route, index))}</Routes>;
	};
	const getPathsPublic = () => {
		return (
			<Routes>
				{publicRoutes.map((route, index) => setPage(route, index))}
				<Route
					path={"/*"}
					element={
						<Navigate
							replace
							to={PageConfig.login.route}
						/>
					}
				/>
			</Routes>
		);
	};
	return (
		<div className={cx("app")}>
			<div className={cx("wrapper")}>
				<Loading isLoading={isLoading}>
					<BrowserRouter>{state.isLogin ? getPathsPrivate() : getPathsPublic()}</BrowserRouter>
				</Loading>
			</div>
		</div>
	);
}

export default App;
