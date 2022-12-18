import React, { useState } from "react";
import { Layout, Menu } from "antd";
import images, { icons } from "~/assets/images";
import { getKey } from "~/utils/util";
import PageConfig from "~/stores/pages";
import styles from "./sidebar.module.scss";
import classNames from "classnames/bind";
import MenuConfig from "~/stores/Menu";
import { Link } from "react-router-dom";
import { constants } from "~/stores";

const cx = classNames.bind(styles);
const { Header, Sider, Content } = Layout;

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
	console.log("curren path", currentPath);
	let key = "home";
	if (currentPath !== "/") {
		key = getKey("route", currentPath);
	}
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
					alt={constants.WEB_NAME}
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
