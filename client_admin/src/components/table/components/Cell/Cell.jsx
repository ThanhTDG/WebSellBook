import React from "react";
import { TableCell as TableCellMui } from "@mui/material";

function Cell(props) {
	const {
		typeCell = "normal",
		key = null,
		size = "medium",
		align = "right",
		style = null,
		children,
		...passProps
	} = props;
	let sx = {};
	switch (typeCell) {
		case "header":
			sx = { fontSize: 16, fontWeight: 500 };
			break;
	}
	return (
		<TableCellMui sx={sx} key={key} size={size} align={align} style={style} {...passProps}>
			{children}
		</TableCellMui>
	);
}

export default Cell;
