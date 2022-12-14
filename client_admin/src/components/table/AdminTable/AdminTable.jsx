import { Paper } from "@mui/material";
import React from "react";
import PageConfig from "~/stores/pages";
import styles from "./adminTable.module.scss";
import * as tableConfig from "~/stores/ComponentConfigs/table";
import classNames from "classnames/bind";
import Footer from "../Footer";
import { useState } from "react";
import { Fragment } from "react";
import Popper from "~/components/Popper";
import typeUser from "~/stores/types/typeUser";
import Controls from "~/components/controls";
import { listStatus } from "~/stores/Admins/customerStatus";
import Table from "~/components/table/components";
import { generatePath, Link } from "react-router-dom";
const cx = classNames.bind(styles);
const headers = tableConfig.table.admin;
const sizeCellBody = "small";
function AdminTable(props) {
	const { state, admins, onLimitChange, onPageChange } = props;
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
				{admins && admins.length > 0 && (
					<Table.Body>
						{admins.map((item) => (
							<AdminRow
								key={item.id}
								admin={item}
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
function AdminRow(props) {
	const { admin, key } = props;

	const [isHovering, setIsHovering] = useState(false);
	const [isEnable, setIsEnable] = useState(admin.status !== listStatus[2].key);
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
						<Popper.UserDetail
							visible={isHovering}
							user={admin}
							type={typeUser.admin}
						>
							<Link
								to={generatePath(PageConfig.accountAdmin.route, {
									id: admin.id,
								})}
								target="_blank"
							>
								<div className={"single-line"}> {admin.email}</div>
							</Link>
						</Popper.UserDetail>
					</div>
				</Table.Cell>
				<Table.Cell
					align="left"
					size={sizeCellBody}
				>
					<div className={cx("row-table", "name")}>
						<div
							className={"single-line"}
						>{`${admin.lastName} ${admin.firstName}`}</div>
					</div>
				</Table.Cell>
				<Table.Cell size={sizeCellBody}>{admin.phone}</Table.Cell>
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
export default AdminTable;
