import React from "react";
import { TableCell as TableCellMui, tableCellClasses } from "@mui/material";
import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";

function Cell(props) {
	const {
		size = "small",
		align = "right",
		backgroundColor = "#000000",
		color = "#FFFFFF",
		isLast = true,
		zIndex = 2,
		colorChildren = {},
		children,
		...passProps
	} = props;
	const other = { ...passProps };
	let lastCellStyle = {};
	if (isLast) {
		lastCellStyle = {
			width: "0",
			whiteSpace: "nowrap",
		};
	}
	const StyledTableCell = styled(TableCellMui)(({ theme }) => ({
		[`&.${tableCellClasses.head}`]: {
			backgroundColor: backgroundColor,
			color: color,
			...lastCellStyle,
			zIndex: zIndex,
		},
		[`&.${tableCellClasses.body}`]: {
			fontSize: 14,
			...colorChildren,
			...lastCellStyle,
		},
	}));
	return (
		<StyledTableCell
			align={align}
			size={size}
			{...other}
		>
			{children}
		</StyledTableCell>
	);
}

export default Cell;
