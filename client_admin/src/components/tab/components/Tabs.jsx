import React from "react";
import { Tab, Paper, Tabs as TabMui } from "@mui/material";
import classNames from "classnames/bind";
import styles from "./tabs.module.scss";
import { styled } from "@mui/material/styles";

const cx = classNames.bind(styles);

const AntTabs = styled(TabMui)({
	marginBottom: 1,
	"& .MuiTabs-indicator": {
		marginTop: 4,
		backgroundColor: "white",
		borderRadius: 10,
		display: "none",
	},
});

const AntTab = styled((props) => (
	<Tab
		disableRipple
		{...props}
	/>
))(({ theme }) => ({
	textTransform: "none",
	minWidth: 120,
	maxHeight: 40,
	[theme.breakpoints.up("sm")]: {
		minWidth: 120,
		maxHeight: 40,
	},
	fontWeight: theme.typography.fontWeightRegular,
	marginRight: "4px",
	color: "rgba(0, 0, 0, 0.85)",
	backgroundColor: "rgba(0, 0, 0, 0.1)",
	borderRadius: "5px 5px 0px 0px ",
	transition: "linear 0.2s",
	fontFamily: [
		"Roboto",
		"-apple-system",
		"BlinkMacSystemFont",
		'"Segoe UI"',
		'"Helvetica Neue"',
		"Arial",
		"sans-serif",
		'"Apple Color Emoji"',
		'"Segoe UI Emoji"',
		'"Segoe UI Symbol"',
	].join(","),

	"&:hover": {
		color: "#40a9ff",
		opacity: 1,
	},
	"&.Mui-selected": {
		borderRadius: "20px 5px 20px 5px",
		color: "#1890ff",
		backgroundColor: "white",
		fontWeight: theme.typography.fontWeightMedium,
	},
	"&.Mui-focusVisible": {
		backgroundColor: "#d1eaff",
	},
}));

function Tabs(props) {
	const {
		type = "table",
		value,
		onChange,
		items,
		children,
		...passProp
	} = props;
	let Comp = AntTabs;
	switch (type) {
		case "info":
			Comp = TabMui;
			break;
		default:
			break;
	}

	return (
		<div className={cx("wrapper")}>
			<Comp
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
						<AntTab
							sx={{ fontSize: "subtitle1.fontSize" }}
							key={item.key}
							label={item.title}
						/>
					);
				})}
			</Comp>
			<Paper className={cx("content-tab")}>{children}</Paper>
		</div>
	);
}

export default Tabs;
