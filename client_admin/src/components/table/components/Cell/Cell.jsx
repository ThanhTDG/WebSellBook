import React from "react";
import { TableCell as TableCellMui, tableCellClasses } from "@mui/material";
import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";

function Cell(props) {
	const { size = "medium", align = "right", width: refWidth = null, children, ...passProps } = props;
	let sx = {};
	let value = 150;

	const StyledTableCell = styled(TableCellMui)(({ theme }) => ({
		[`&.${tableCellClasses.head}`]: {
			backgroundColor: theme.palette.common.black,
			color: theme.palette.common.white,
			width: refWidth ? refWidth : 184,
			"min-width": "184px",
		},
		[`&.${tableCellClasses.body}`]: {
			fontSize: 14,
			width: refWidth ? refWidth : 184,
			"min-width": "184px",
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
