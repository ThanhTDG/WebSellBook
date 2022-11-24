import React, { useState } from "react";
import {
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	UploadOutlined,
	UserOutlined,
	VideoCameraOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import classNames from "classnames/bind";
import styles from "./defaultLayout.module.scss";
import { getKey } from "~/utils/util";
import PageConfig from "~/stores/pages";
import Sidebar from "../components/SidebarCustom";
import Navbar from "../components/HeaderCustom";
const cx = classNames.bind(styles);

const { Header, Sider, Content } = Layout;

function DefaultLayout({ children }) {
	const [collapsed, setCollapsed] = useState(false);

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
				<Content className={cx("container", collapsed ? "max" : "min")}>
					<div className={cx("content")}>{children}</div>
				</Content>
			</Layout>
		</Layout>
	);
}
export default DefaultLayout;
