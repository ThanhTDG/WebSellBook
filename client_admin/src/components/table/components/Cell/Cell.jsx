import React from "react";
import { TableCell as TableCellMui, tableCellClasses } from "@mui/material";
import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";

function Cell(props) {
	const { key = null, size = "medium", align = "right", width: refWidth = null, children, ...passProps } = props;
	let sx = {};
	let value = 150;

	const StyledTableCell = styled(TableCellMui)(({ theme }) => ({
		[`&.${tableCellClasses.head}`]: {
			backgroundColor: theme.palette.common.black,
			color: theme.palette.common.white,
			width: refWidth ? refWidth : 200,
			minWith: "200px",
		},
		[`&.${tableCellClasses.body}`]: {
			fontSize: 14,
			width: refWidth ? refWidth : 200,
			minWith: "200px",
		},
	}));
	return (
		<StyledTableCell
			align={align}
			size={size}
		>
			{children}
		</StyledTableCell>
		// <TableCellMui
		// 	sx={sx}
		// 	key={key}
		// 	size={size}
		// 	align={align}
		// 	style={style}
		// 	{...passProps}
		// >
		// 	{children}
		// </TableCellMui>
	);
}

export default Cell;
