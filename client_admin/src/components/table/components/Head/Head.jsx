import React from "react";
import { TableHead as TableHeadMui } from "@mui/material";
function Head(props) {
	const { children, ...passProps } = props;
	return <TableHeadMui {...passProps}>{children}</TableHeadMui>;
}

export default Head;
