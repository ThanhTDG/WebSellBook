import React from "react";
import { Table, TableContainer } from "@mui/material";

function Frame(props) {
	const { label = "table", children, ...passProps } = props;
	return (
		<TableContainer {...passProps}>
			<Table
				stickyHeader
				aria-label={label}
			>
				{children}
			</Table>
		</TableContainer>
	);
}

export default Frame;
