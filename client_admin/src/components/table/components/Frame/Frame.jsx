import React from "react";
import { Table, TableContainer } from "@mui/material";

function Frame(props) {
	const { label = "table", children, ...passProps } = props;
	return (
		<TableContainer>
			<Table aria-label={label} {...passProps}>
				{children}
			</Table>
		</TableContainer>
	);
}

export default Frame;
