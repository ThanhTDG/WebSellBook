import React, { useState } from "react";
import {
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	UploadOutlined,
	UserOutlined,
	VideoCameraOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import Sidebar from "../components/Sidebar/Sidebar";
import classNames from "classnames/bind";
import styles from "./defaultLayout.module.scss";
import { getKey } from "~/utils/util";
import PageConfig from "~/config/pages";
import Navbar from "../components/Navbar";
const cx = classNames.bind(styles);

const { Header, Sider, Content } = Layout;

function DefaultLayout({ children }) {
	const [collapsed, setCollapsed] = useState(false);
	let key = getKey("route", window.location.pathname);
	let label = "";
	if (key) {
		label = PageConfig[key].label;
	}
	return (
		<Layout style={{ minHeight: "100vh" }}>
			<Layout className="site-layout">
				<div className={cx("header", collapsed ? "max" : "min")}>
					<Navbar />
				</div>
				<Sidebar
					collapsed={collapsed}
					setCollapsed={setCollapsed}
				/>
				<Content className={cx("content", collapsed ? "max" : "min")}>
					<div className={cx("title")}>
						<h2>{label}</h2>
					</div>
					{children}
				</Content>
			</Layout>
		</Layout>
	);
}
export default DefaultLayout;
