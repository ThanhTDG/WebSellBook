import React, { useState } from "react";
import { Layout, Menu } from "antd";
import images, { icons } from "~/assets/images";
import { getKey } from "~/utils/util";
import PageConfig from "~/config/pages";
import styles from "./sidebar.module.scss";
import classNames from "classnames/bind";
import MenuConfig from "~/config/Menu";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);
const { Header, Sider, Content } = Layout;
const items = [
	getItem("Option 1", "1", icons.Button("test").close),
	getItem("Option 2", "2", icons.Button("test").close),
	getItem("User", "sub1", icons.Button("test").close, [
		getItem("Tom", "3"),
		getItem("Bill", "4"),
		getItem("Alex", "5"),
	]),
	getItem("Team", "sub2", icons.Button("test").close, [
		getItem("Team", "sub2", icons.Button("test").close, [getItem("Team", "sub2", icons.Button("test").close)]),
		getItem("Team 2", "8"),
	]),
	getItem("Files", "9", icons.Button("test").close),
];

function getItem(label, key, icon, children) {
	return {
		key,
		label,
		icon,
		children,
	};
}
function Sidebar({ collapsed, setCollapsed }) {
	let currentPath = window.location.pathname;
	let key = getKey("route", currentPath);
	return (
		<Sider
			className={cx("sidebar")}
			collapsible
			collapsed={collapsed}
			onCollapse={(value) => setCollapsed(value)}
		>
			<Link
				className={cx("logo")}
				to={PageConfig.home.route}
			>
				<img
					src={collapsed ? images.logo : images.logoAndText}
					alt="Tôi Mua Sách"
				/>
			</Link>

			<Menu
				onClick={(e) => {
					console.log(e);
				}}
				theme="dark"
				defaultSelectedKeys={key}
				mode="inline"
				items={MenuConfig.sideBar}
			/>
		</Sider>
	);
}

export default Sidebar;