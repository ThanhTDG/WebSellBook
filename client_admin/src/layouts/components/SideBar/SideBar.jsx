import "./sidebar.scss";
import { sidebarOptions } from "./sidebarOptions.js";
import { icons } from "~/assets/images";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import images from "~/assets/images";
import { Button } from '~/components/Button'
import { default as RouteConfig } from '~/config/routes'
let menuItem = [];

function Sidebar() {
	return (
		<div className="sidebar">
			<div className="top">
				<div className="logo">
					<img src={images.logoAndText} alt="Tôi Mua Sách" />
				</div>
			</div>
			<div className="center">
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
				<p className="title">{title}</p>
				{item.map((item, index) => {
					return Option(item, index);
				})}
			</div>
		);
	});
}

const Option = (data, index) => {
	let key = data.key;
	menuItem.concat(data);
	let navigate = useNavigate();
	let current = window.location.pathname.split("/")[1];
	if (!current) {
		current = "home";
	}
	return (
		<li key={index + key}>
			<div
				className={current === key ? "menuItem active" : "menuItem"}
				key={data.key}
				onClick={() => {
					navigate(RouteConfig[data.key]);
				}}
			>

				{icons.Sidebar[key]}
				<span>{data.name}</span>
			</div>
		</li>
	);
};

export default Sidebar;
