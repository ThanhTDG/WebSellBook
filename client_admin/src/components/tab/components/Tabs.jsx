import React from "react";
import { Tab, Paper, Tabs as TabMui } from "@mui/material";
import classNames from "classnames/bind";
import styles from "./tabs.module.scss";

const cx = classNames.bind(styles);
function Tabs(props) {
	const { value, onChange, items, children, ...passProp } = props;
	return (
		<div className={cx("wrapper")}>
			<TabMui
				sx={{ borderBottom: 1, borderColor: "divider" }}
				value={value}
				onChange={onChange}
				aria-label="tab"
				variant="scrollable"
				scrollButtons
				allowScrollButtonsMobile
				{...passProp}
			>
				{items.map((item, index) => {
					return (
						<Tab
							sx={{ fontSize: "subtitle1.fontSize" }}
							key={item.key}
							label={item.title}
						/>
					);
				})}
			</TabMui>
			<Paper className={cx("content-tab")}>{children}</Paper>
		</div>
	);
}

export default Tabs;
