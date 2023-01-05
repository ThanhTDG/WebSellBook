import { Layout } from "antd";
import classNames from "classnames/bind";
import React from "react";
import { useState } from "react";
import Sidebar from "../components/SidebarCustom/Sidebar";

import styles from "./onlyNavLayout.module.scss";

const cx = classNames.bind(styles);
const { Header, Sider, Content } = Layout;

function OnlyNavLayout({ children }) {
	const [collapsed, setCollapsed] = useState(true);
	return (
		<Layout style={{ minHeight: "100vh" }}>
			<Layout className="site-layout">
				<Sidebar
					collapsed={collapsed}
					setCollapsed={setCollapsed}
				/>
				<Content className={cx("container", collapsed ? "max" : "min")}>
					<div className={cx("content")}>{children}</div>
				</Content>
			</Layout>
		</Layout>
	);
}

export default OnlyNavLayout;
