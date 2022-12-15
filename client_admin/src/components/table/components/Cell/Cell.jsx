import React from "react";
import { TableCell as TableCellMui, tableCellClasses } from "@mui/material";
import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";

function Cell(props) {
	const { size = "small", align = "right", isLast = true, children, ...passProps } = props;
	let lastCellStyle = {};
	if (isLast) {
		lastCellStyle = {
			width: "1%",
			whiteSpace: "nowrap",
		};
	}
	const StyledTableCell = styled(TableCellMui)(({ theme }) => ({
		[`&.${tableCellClasses.head}`]: {
			backgroundColor: theme.palette.common.black,
			color: theme.palette.common.white,
			...lastCellStyle,
		},
		[`&.${tableCellClasses.body}`]: {
			fontSize: 14,
			...lastCellStyle,
		},
	}));
	return (
		<StyledTableCell
			align={align}
			size={size}
		>
			{children}
		</StyledTableCell>
	);
}

export default Cell;
