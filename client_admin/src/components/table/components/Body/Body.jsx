import React from "react";
import { TableBody as TableBodyMui } from "@mui/material";
function Body(props) {
	const { children } = props;
	return <TableBodyMui>{children}</TableBodyMui>;
}

export default Body;
