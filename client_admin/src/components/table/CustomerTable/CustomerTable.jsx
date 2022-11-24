import { Paper } from "@mui/material";
import React, { useReducer, memo, useState, Fragment } from "react";

import Table from "~/components/table/components";
import { table as tableConfig, limitRow } from "~/stores/table";

import Footer from "../Footer";
import { status } from "~/stores/Customer/customerStatus";
import PageConfig from "~/stores/pages";
import { generatePath, Link } from "react-router-dom";
import Controls from "~/components/controls";
const headers = tableConfig.customer.headers;

function CustomerTable(props) {
	const { state, customers, onLimitChange, onPageChange } = props;
	console.log(customers);
	return (
		<Paper>
			<Table.Frame style={{ maxHeight: 700 }}>
				<Table.Head>
					<Table.Cell align={headers[0].align}>{headers[0].title}</Table.Cell>
					<Table.Cell align={headers[1].align}>{headers[1].title}</Table.Cell>
					<Table.Cell align={headers[2].align}>{headers[2].title}</Table.Cell>
					<Table.Cell align={headers[3].align}>{headers[3].title}</Table.Cell>
				</Table.Head>
				{customers && customers.length > 0 && (
					<Table.Body>
						{customers.map((item) => (
							<CustomerRow
								key={item._id}
								customer={item}
							/>
						))}
					</Table.Body>
				)}
			</Table.Frame>

			<Footer
				limitValue={state.limit}
				limit={limitRow}
				onLimitChange={onLimitChange}
				pageValue={state.page}
				pageMax={state.totalPages}
				onPageChange={onPageChange}
			/>
		</Paper>
	);
}
function CustomerRow(props) {
	const { customer, key } = props;
	console.log(customer);
	const [isHovering, setIsHovering] = useState(false);
	const [isEnable, setIsEnable] = useState(customer.status !== status.banned);
	const handleMouseOut = () => {
		setIsHovering(false);
	};
	const handleMouseOver = () => {
		setIsHovering(true);
	};

	const handleSwitchStatus = () => {
		setIsEnable(!isEnable);
	};
	return (
		<Fragment key={key}>
			<Table.Row>
				<Table.Cell
					size="small"
					align="left"
					onMouseOver={handleMouseOver}
					onMouseOut={handleMouseOut}
				>
					<Link
						to={generatePath(PageConfig.customer.route, {
							id: customer._id,
						})}
						target="_blank"
					>
						<div className={"single-line"}>{`${customer.lastName} ${customer.firstName}`}</div>
					</Link>
				</Table.Cell>
				<Table.Cell
					align="left"
					size="small"
				>
					{customer.email}
				</Table.Cell>
				<Table.Cell size="small">{customer.phone}</Table.Cell>
				<Table.Cell size="small">
					<Controls.Switch
						checked={isEnable}
						onChange={handleSwitchStatus}
					/>
				</Table.Cell>
			</Table.Row>
		</Fragment>
	);
}
export default CustomerTable;
