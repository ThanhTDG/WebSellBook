import { sidebarOptions } from "./sidebarOptions.js";
import { icons } from "~/assets/images";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import images from "~/assets/images";
import { Button } from "~/components/Button";
import { default as PageConfig } from "~/config/pages";
import { getKey } from "~/utils/util";
import classNames from "classnames/bind";
import styles from "./sidebar.module.scss";
const cx = classNames.bind(styles);

function Sidebar() {
	return (
		<div className={cx("sidebar")}>
			<div className={cx("top")}>
				<div>
					<a className={cx("logo")} href={PageConfig.home.route}>
						<img src={images.logoAndText} alt="Tôi Mua Sách" />
					</a>
				</div>
			</div>
			<div className={cx("center")}>
				<ul>{RenderOption()}</ul>
			</div>
		</div>
	);
}

function RenderOption() {
	return sidebarOptions.map((option, index) => {
		let title = option.title;
		let item = option.item;
		return (
			<div key={index + title}>
				<p className={cx("title")}>{title}</p>
				{item.map((item, index) => {
					return Option(item, index);
				})}
			</div>
		);
	});
}

const Option = (data, index) => {
	let key = data.key;
	let navigate = useNavigate();
	let currentPath = window.location.pathname;
	let active = getKey("route", currentPath) === key;
	let classMenuItem = cx("menuItem", {
		active,
	});
	return (
		<li key={key}>
			<div
				className={classMenuItem}
				key={data.key}
				onClick={() => {
					navigate(PageConfig[data.key].route);
				}}
			>
				{icons.Sidebar({ className: cx("icon") })[key]}
				<span>{data.title}</span>
			</div>
		</li>
	);
};

export default Sidebar;
