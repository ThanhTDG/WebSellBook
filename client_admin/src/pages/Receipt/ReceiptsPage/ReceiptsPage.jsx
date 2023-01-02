import { Collapse, IconButton, Paper } from "@mui/material";
import classNames from "classnames/bind";
import React, { Fragment, useEffect, useState } from "react";
import { useReducer } from "react";

import Loading from "~/components/Loading";
import Tabs from "~/components/tab/components/Tabs";
import TabPanel from "~/components/tab/TabPanel";
import Footer from "~/components/table/Footer";
import InfoLayout from "~/layouts/InfoLayout";
import * as tableConfig from "~/stores/ComponentConfigs/table";
import { actions, constants, cusReducer } from "~/stores";
import styles from "./receiptsPage.module.scss";
import Table from "~/components/table/components";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import receipts from "../fakeReceipt";
import Controls from "~/components/controls";
import OutlinedBox from "~/components/OutlinedBox";
import { displayTime, displayMoney } from "~/utils/display";
import { icons } from "~/assets/images";
import { generatePath, Link } from "react-router-dom";
import PageConfig from "~/stores/pages";
const listStatus = [
	{
		key: "all",
		title: "Tất cả",
		engTitle: "All",
	},
	{
		key: "notProcessed",
		title: "Chờ xử lý",
		engTitle: "waiting for processed",
	},
	{
		key: "processing",
		title: "Chờ xác nhận",
		engTitle: "Processing",
	},
	{
		key: "shipping",
		title: "Đang giao hàng",
		engTitle: "Shipping",
	},
	{
		key: "competed",
		title: "hoàn thành",
		engTitle: "Competed",
	},
	{
		key: "canceled",
		title: "Bị hủy",
		engTitle: "Canceled",
	},
];
const cx = classNames.bind(styles);
function ReceiptsPage() {
	const [tableTab, dispatchTableTab] = useReducer(
		cusReducer.reducers.TabTableReduce,
		cusReducer.initStates.receipts
	);
	const [editMode, dispatchEditMode] = useReducer(
		cusReducer.reducers.EditModeReducer,
		cusReducer.initStates.editModeState
	);
	const [loadingTab, setLoadingTab] = useState(true);
	const [loadingTable, setLoadingTable] = useState(true);
	useEffect(() => {
		setLoadingTab(false);
	}, []);
	const handlePageChange = (e, optionSelected) => {
		dispatchTableTab(actions.setPageProducts(optionSelected));
	};
	const handleLimitChange = (e) => {
		dispatchTableTab(actions.setLimitRow(e.target.value));
	};
	let displayStatus = false;
	return (
		<InfoLayout
			editMode={editMode}
			dispatchEditMode={dispatchEditMode}
			showFeature={false}
		>
			<Loading isLoading={loadingTab}>
				<div className={cx("wrapper")}>
					<Tabs
						value={tableTab.indexStatus}
						items={listStatus}
					>
						{listStatus.map((item, index) => (
							<TabPanel
								key={index}
								value={tableTab.indexStatus}
								index={index}
							>
								<div className={cx("tab-panel")}>
									<Table.Frame style={{ maxHeight: 700 }}>
										<Table.Head>
											<Table.Cell
												zIndex={4}
												isLast={false}
												size={"normal"}
											></Table.Cell>
											<Table.Cell
												zIndex={4}
												isLast={false}
												size={"normal"}
											>
												<div className={cx("title", "recept-code")}>
													Mã đơn hàng
												</div>
											</Table.Cell>
											<Table.Cell
												zIndex={4}
												isLast={false}
												size={"normal"}
											>
												<div className={cx("title", "recept-sum")}>
													{constants.ALL_PAY}
												</div>
											</Table.Cell>
											<Table.Cell
												zIndex={4}
												isLast={false}
												size={"normal"}
											>
												<div className={cx("title", "recept-date")}>
													Ngày tiếp nhận
												</div>
											</Table.Cell>
											{displayStatus && (
												<Table.Cell
													zIndex={4}
													isLast={false}
													size={"normal"}
												>
													<div className={cx("title", "recept-status")}>
														Trạng thái
													</div>
												</Table.Cell>
											)}
											<Table.Cell
												zIndex={4}
												isLast={false}
												size={"normal"}
											>
												<div className={cx("title", "recept-user")}>
													Người mua
												</div>
											</Table.Cell>
											<Table.Cell
												zIndex={4}
												isLast={false}
											/>
										</Table.Head>
										<Table.Body>
											{receipts.map((receipt) => (
												<RowReceipt
													showStatus={displayStatus}
													receipt={receipt}
												/>
											))}
										</Table.Body>
									</Table.Frame>
									<Footer
										limitValue={tableTab.limit}
										limit={tableConfig.limitRow}
										onLimitChange={handleLimitChange}
										onPageChange={handlePageChange}
										pageValue={tableTab.page}
										pageMax={tableTab.totalPages}
									/>
								</div>
							</TabPanel>
						))}
					</Tabs>
				</div>
			</Loading>
		</InfoLayout>
	);
}
function RowReceipt(props) {
	const { receipt, showStatus = false } = props;
	const [open, setOpen] = React.useState(false);
	return (
		<Fragment>
			<Table.Row size={"normal"}>
				<Table.Cell>
					<IconButton
						aria-label="expand row"
						size="small"
						onClick={() => setOpen(!open)}
					>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</Table.Cell>
				<Table.Cell>
					<Link
						to={generatePath(PageConfig.receipt.route, {
							id: receipt.id,
						})}
						target="_blank"
					>
						<div className={cx("body", "recept-code")}>{receipt.id}</div>
					</Link>
				</Table.Cell>
				<Table.Cell>
					<div className={cx("body", "recept-sum")}>
						{displayMoney(receipt.pay, false)}
					</div>
				</Table.Cell>
				<Table.Cell>
					<div className={cx("body", "recept-date")}>{`${displayTime(
						Date.now()
					)}`}</div>
				</Table.Cell>
				{showStatus && (
					<Table.Cell>
						<div className={cx("body", "status")}>{receipt.status}</div>
					</Table.Cell>
				)}
				<Table.Cell isLast={false}>
					<div className={cx("body", "recept-user")}>{receipt.user.email}</div>
				</Table.Cell>
				<Table.Cell>
					{open === false && (
						<Controls.Button
							primary
							className={cx("btn-view")}
						>
							<Link
								to={generatePath(PageConfig.receipt.route, {
									id: receipt.id,
								})}
								target="_blank"
							>
								{icons.Button("").view}
							</Link>
						</Controls.Button>
					)}
				</Table.Cell>
			</Table.Row>
			<Table.Row>
				<Table.Cell
					isLast={false}
					className={cx("detail-receipt")}
					colSpan={6}
				>
					<Collapse
						in={open}
						timeout="auto"
						unmountOnExit
					>
						<div className={cx("wrapper-detail")}>
							<ProductsNPrice receipt={receipt} />
							<div className={cx("feature")}>
								<div className={cx("contact-action")}>
									<Contact address={receipt.address} />
									<Action />
								</div>
								<ViewDetail id={receipt.id} />
							</div>
						</div>
					</Collapse>
				</Table.Cell>
			</Table.Row>
		</Fragment>
	);
}
function ViewDetail({ id }) {
	return (
		<div className={cx("view-detail")}>
			<Controls.Button
				primary
				className={cx("btn-view-detail")}
			>
				<Link
					to={generatePath(PageConfig.receipt.route, {
						id: id,
					})}
					target="_blank"
				>
					Chi tiết đơn hàng
				</Link>
			</Controls.Button>
		</div>
	);
}
function ProductsNPrice(props) {
	const { receipt } = props;
	const color = { backgroundColor: "#FFFfFF", color: "#051e34" };
	let sumAllProduct = 0;
	return (
		<Table.Frame>
			<Table.Head>
				<Table.Cell
					isLast={false}
					{...color}
					colSpan={2}
					align="left"
				>
					<div className={cx("title-detail", "name")}>{"Tên"}</div>
				</Table.Cell>
				<Table.Cell
					isLast={false}
					{...color}
				>
					<div className={cx("title-detail", "amount")}>{"Số lượng"}</div>
				</Table.Cell>
				<Table.Cell
					isLast={false}
					{...color}
				>
					<div className={cx("title-detail", "price")}>{"Giá"}</div>
				</Table.Cell>
				<Table.Cell
					isLast={false}
					{...color}
				>
					<div className={cx("title-detail", "sum")}>{"Tổng(VND)"}</div>
				</Table.Cell>
			</Table.Head>
			<Table.Body>
				{receipt.products.map((product) => {
					let sum = product.sum ? product.sum : product.price * product.amount;
					sumAllProduct += sum;
					return (
						<Table.Row>
							<Table.Cell
								isLast={false}
								colSpan={2}
								colorChildren={color}
								align="left"
							>
								<div className={cx("body-detail", "name")}>{product.name}</div>
							</Table.Cell>
							<Table.Cell
								isLast={false}
								colorChildren={color}
							>
								<div className={cx("body-detail", "amount")}>
									{product.amount}
								</div>
							</Table.Cell>
							<Table.Cell
								isLast={false}
								colorChildren={color}
							>
								<div className={cx("body-detail", "price")}>
									{displayMoney(product.price, false)}
								</div>
							</Table.Cell>
							<Table.Cell
								isLast={false}
								colorChildren={color}
							>
								<div className={cx("body-detail", "sum")}>
									{`${displayMoney(sum, false)}`}
								</div>
							</Table.Cell>
						</Table.Row>
					);
				})}
				<ItemTotal
					title={constants.SUM_ALL_PRODUCT}
					sum={sumAllProduct}
				/>
				<ItemTotal title={constants.VOUCHER} />
				<ItemTotal
					spec={true}
					title={constants.PAY_ALL}
					sum={sumAllProduct}
				/>
			</Table.Body>
		</Table.Frame>
	);
}
function ItemTotal(props) {
	const { title = "", value = "", sum = "", spec = false } = props;
	const color = { backgroundColor: "#FFFfFF", color: "#051e34" };
	return (
		<Table.Row>
			<td className={cx("white")}></td>
			<Table.Cell
				isLast={false}
				colorChildren={color}
				className={cx("title-item-total")}
			>
				<div className={cx({ spec: spec })}>{title}</div>
			</Table.Cell>
			<Table.Cell
				isLast={false}
				colorChildren={color}
			></Table.Cell>
			<Table.Cell
				isLast={false}
				colorChildren={color}
				className={cx("value-item-total")}
			>
				<div className={cx({ spec: spec })}>{value}</div>
			</Table.Cell>
			<Table.Cell
				isLast={false}
				colorChildren={color}
				className={cx("sum-item-total")}
			>
				<div className={cx({ spec: spec })}>{sum}</div>
			</Table.Cell>
		</Table.Row>
	);
}
function Action(props) {
	const { action, cancel } = props;
	return (
		<div className={cx("wrapper-action")}>
			<Controls.Button primary>{constants.CONFIRM}</Controls.Button>
			<Controls.Button
				outline
				className={cx("cancel")}
			>
				{constants.CANCEL}
			</Controls.Button>
		</div>
	);
}
function Contact(props) {
	const { address, user } = props;
	return (
		<OutlinedBox
			label={"Địa chỉ giao hàng"}
			classNames={cx("wrapper-contact")}
		>
			<PropContact
				title={constants.RECIPIENT}
				value={address.fullName}
			/>
			<PropContact
				title={constants.PHONE}
				value={address.phone}
			/>
			<PropContact
				title={constants.REGION}
				value={address.region}
			/>
			<div className={cx("space")}>
				<PropContact
					title={constants.DISTRICT}
					value={address.district}
				/>
				<PropContact
					title={constants.WARD}
					value={address.ward}
				/>
			</div>

			<PropContact
				title={constants.ADDRESS}
				value={address.address}
			/>
		</OutlinedBox>
	);
}

function PropContact(props) {
	const { title, value } = props;
	return (
		<div className={cx("wrapper-props-contact")}>
			<div className={cx("title-prop-contact")}>{title}:</div>
			<div className={cx("value-prop-contact")}>{value}</div>
		</div>
	);
}

export default ReceiptsPage;
