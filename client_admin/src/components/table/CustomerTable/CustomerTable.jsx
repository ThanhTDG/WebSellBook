import { Paper } from "@mui/material";
import React, { useReducer, memo, useState, Fragment } from "react";
import classNames from "classnames/bind";

import Table from "~/components/table/components";
import * as tableConfig from "~/stores/ComponentConfigs/table";
import Footer from "../Footer";
import { status } from "~/stores/Customer/customerStatus";
import PageConfig from "~/stores/pages";
import { generatePath, Link } from "react-router-dom";
import Controls from "~/components/controls";
import styles from "./customerTable.module.scss";

const cx = classNames.bind(styles);
const headers = tableConfig.table.customer;
const sizeCellBody = "small";

function CustomerTable(props) {
	const { state, customers, onLimitChange, onPageChange } = props;
	return (
		<Paper>
			<Table.Frame style={{ maxHeight: 700, width: "auto" }}>
				<Table.Head>
					<Table.Cell
						align={headers.email.align}
						isLast={false}
					>
						<div className={cx("header", "email")}>{headers.email.title}</div>
					</Table.Cell>
					<Table.Cell align={headers.name.align}>
						<div className={cx("header", "name")}>{headers.name.title}</div>
					</Table.Cell>
					<Table.Cell align={headers.phone.align}>
						<div className={cx("header", "phone")}>{headers.phone.title}</div>
					</Table.Cell>
					<Table.Cell align={headers.status.align}>
						<div className={cx("header", "status")}>{headers.status.title}</div>
					</Table.Cell>
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
				limit={tableConfig.limitRow}
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
					isLast={false}
					size={sizeCellBody}
					align="left"
					onMouseOver={handleMouseOver}
					onMouseOut={handleMouseOut}
				>
					<div className={cx("row-table", "email")}>
						<Link
							to={generatePath(PageConfig.customer.route, {
								id: customer._id,
							})}
							target="_blank"
						>
							<div className={"single-line"}> {customer.email}</div>
						</Link>
					</div>
				</Table.Cell>
				<Table.Cell
					align="left"
					size={sizeCellBody}
				>
					<div className={cx("row-table", "name")}>
						<div className={"single-line"}>{`${customer.lastName} ${customer.firstName}`}</div>
					</div>
				</Table.Cell>
				<Table.Cell size={sizeCellBody}>{customer.phone}</Table.Cell>
				<Table.Cell
					size={sizeCellBody}
					align="right"
				>
					<div className={cx("row-table", "status")}>
						<Controls.Switch
							checked={isEnable}
							onChange={handleSwitchStatus}
						/>
					</div>
				</Table.Cell>
			</Table.Row>
		</Fragment>
	);
}
export default CustomerTable;
