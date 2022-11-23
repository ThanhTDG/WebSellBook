import React from "react";
import { TableRow as TableRowMui } from "@mui/material";
import { styled } from "@mui/material/styles";
const StyledTableRow = styled(TableRowMui)(({ theme }) => ({
	width: "100%",
	"&:nth-of-type(odd)": {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	"&:last-child td, &:last-child th": {
		border: 0,
	},
}));

function Row(props) {
	const { sx = { "& > *": { borderBottom: "unset", maxWidth: 1 } }, children } = props;
	return <StyledTableRow sx={sx}>{children}</StyledTableRow>;
}

export default Row;
