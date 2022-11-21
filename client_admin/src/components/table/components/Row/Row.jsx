import React from "react";
import { TableRow as TableRowMui } from "@mui/material";

function Row(props) {
	const { sx = { "& > *": { borderBottom: "unset" } }, children } = props;
	return <TableRowMui sx={sx}>{children}</TableRowMui>;
}

export default Row;
