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
import ReceiptTable from "~/components/table/OrderTable";
import { orderService } from "~/services";
import { actions, constants, cusReducer } from "~/stores";
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
	const [tableTab, dispatchTableTab] = useReducer(cusReducer.reducers.TabTableReduce, cusReducer.initStates.receipts);
	const [isLoading, setIsLoading] = useState(true);
	const [loadingTab, setLoadingTab] = useState(true);
	const [loadingTable, setLoadingTable] = useState(true);
	const [editMode, dispatchEditMode] = useReducer(
		cusReducer.reducers.EditModeReducer,
		cusReducer.initStates.editModeState
	);
	const [idSelected, setIdSelected] = useState("");
	const [filter, setFilter] = useState(cusReducer.initStates.filterOrder);
	const [orders, setOrders] = useState([]);
	const fetchApi = async () => {
		setIsLoading(true);
		destroyTippy();
		const result = await orderService.getOrders(tableTab);
		if (result) {
			handleResponse(result);
		} else {
		}
		setIsLoading(false);
	};
	const handleResponse = (response) => {
		const { status, page, limit, totalPages } = response;
		dispatchTableTab(actions.setNewPropTable({ status, page, limit, totalPages }));
		setOrders(response.docs);
	};
	useEffect(() => {
		fetchApi();
	}, []);
	const destroyTippy = () => {
		if (tableTab && tableTab.length > 0)
			[...document.querySelectorAll("*")].forEach((node) => {
				if (node._tippy) {
					node._tippy.destroy();
				}
			});
	};
	const handleLimitChange = (e) => {
		dispatchTableTab(actions.setLimitRow(e.target.value));
	};
	const handlePageChange = (e, optionSelected) => {
		dispatchTableTab(actions.setPageTable(optionSelected));
	};
	const handleTabChange = (e, optionSelected) => {
		dispatchTableTab(
			actions.setStatusTable({
				indexStatus: optionSelected,
				status: listStatus[optionSelected].key,
			})
		);
	};
	const handleTypeSearchChange = (e) => {
		filter.typeSearch = e.target.value;
	};
	const handleSearchChange = (value) => {
		setFilter({ ...filter, search: value });
	};
	const handleSortChange = (e) => {
		setFilter({
			...filter,
			sort: e.target.value,
		});
	};
	const handleConfirm = (e) => {
		e.preventDefault();
		handleFilter();
	};
	const handleFilter = (e) => {
		dispatchTableTab(actions.setFilterTable({ ...filter }));
	};
	useEffect(() => {
		setLoadingTab(false);
	}, []);
	let displayStatus = false;
	return (
		<InfoLayout
			editMode={editMode}
			dispatchEditMode={dispatchEditMode}
			showFeature={false}
		>
			<Loading isLoading={isLoading}>
				<div className={cx("wrapper")}>
					<Tabs
						onChange={handleTabChange}
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
												<div className={cx("title", "recept-code")}>Mã đơn hàng</div>
											</Table.Cell>
											<Table.Cell
												zIndex={4}
												isLast={false}
												size={"normal"}
											>
												<div className={cx("title", "recept-sum")}>{constants.ALL_PAY}</div>
											</Table.Cell>

											<Table.Cell
												zIndex={4}
												isLast={false}
												size={"normal"}
												align={"center"}
											>
												<div className={cx("title", "recept-date")}>Ngày tiếp nhận</div>
											</Table.Cell>
											{displayStatus && (
												<Table.Cell
													zIndex={4}
													isLast={false}
													size={"normal"}
												>
													<div className={cx("title", "recept-status")}>Trạng thái</div>
												</Table.Cell>
											)}
											<Table.Cell
												zIndex={4}
												align={"left"}
												isLast={false}
												size={"normal"}
											>
												<div className={cx("title", "recept-payment-method")}>{constants.PAY}</div>
											</Table.Cell>
											<Table.Cell
												zIndex={4}
												isLast={false}
												size={"normal"}
											>
												<div className={cx("title", "recept-user")}>{constants.ACCOUNT}</div>
											</Table.Cell>
											<Table.Cell
												zIndex={4}
												isLast={false}
											/>
										</Table.Head>
										<Table.Body>
											{orders.map((order) => (
												<RowOrder
													idSelected={idSelected}
													setIdSelected={setIdSelected}
													showStatus={displayStatus}
													order={order}
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
function RowOrder(props) {
	const { idSelected, setIdSelected, order: receipt, showStatus = false } = props;
	return (
		<Fragment>
			<Table.Row size={"normal"}>
				<Table.Cell>
					<IconButton
						aria-label="expand row"
						size="small"
						onClick={() => {
							if (idSelected === receipt.id) {
								setIdSelected("");
							} else {
								setIdSelected(receipt.id);
							}
						}}
					>
						{idSelected === receipt.id ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</Table.Cell>
				<Table.Cell>
					<Link
						to={generatePath(PageConfig.receipt.route, {
							id: receipt.id,
						})}
						target="_blank"
					>
						<div className={cx("body", "recept-code")}>{receipt.orderCode}</div>
					</Link>
				</Table.Cell>
				<Table.Cell>
					<div className={cx("body", "recept-sum")}>{displayMoney(receipt.total)}</div>
				</Table.Cell>

				<Table.Cell align={"center"}>
					<div className={cx("body", "recept-date")}>{`${displayTime(receipt.createdAt)}`}</div>
				</Table.Cell>
				{showStatus && (
					<Table.Cell>
						<div className={cx("body", "status")}>{receipt.status}</div>
					</Table.Cell>
				)}
				<Table.Cell align={"left"}>
					<div className={cx("body", "recept-pay-method")}>{receipt.paymentMethod}</div>
				</Table.Cell>
				<Table.Cell isLast={false}>
					<div className={cx("body", "recept-user")}>{"receipt.user.email"}</div>
				</Table.Cell>
				<Table.Cell>
					{idSelected !== receipt.id && (
						<Controls.Button
							primary
							className={cx("btn-view")}
						>
							<ViewDetail id={receipt.id}> {icons.Button("").view}</ViewDetail>
						</Controls.Button>
					)}
				</Table.Cell>
			</Table.Row>
			<Table.Row>
				<Table.Cell
					isLast={false}
					className={cx("detail-receipt")}
					colSpan={7}
				>
					<Collapse
						in={idSelected === receipt.id}
						timeout="auto"
						unmountOnExit
					>
						<div className={cx("wrapper-detail")}>
							<ReceiptTable order={receipt} />
							<div className={cx("feature")}>
								<div className={cx("contact-action")}>
									<Contact
										shippingInfo={receipt.shippingInfo}
										shippingMethod={receipt.shippingMethod}
										user={receipt}
									/>
									<Action />
								</div>
								<Controls.Button
									primary
									className={cx("btn-view-detail")}
								>
									<ViewDetail id={receipt.id}>{`${constants.VIEW_DETAIL} ${constants.ORDER.toLowerCase()}`}</ViewDetail>
								</Controls.Button>
							</div>
						</div>
					</Collapse>
				</Table.Cell>
			</Table.Row>
		</Fragment>
	);
}
function ViewDetail(props) {
	const { id, children } = props;
	return (
		<Link
			className={cx("link-to")}
			to={generatePath(PageConfig.receipt.route, {
				id: id,
			})}
			target="_blank"
		>
			{children}
		</Link>
	);
}

// function ReceiptTable(props) {
// 	const { receipt } = props;
// 	const color = { backgroundColor: "#FFFfFF", color: "#051e34" };
// 	let sumAllProduct = 0;
// 	return (
// 		<Table.Frame>
// 			<Table.Head>
// 				<Table.Cell
// 					isLast={false}
// 					{...color}
// 					colSpan={2}
// 					align="left"
// 				>
// 					<div className={cx("title-detail", "name")}>{"Tên"}</div>
// 				</Table.Cell>
// 				<Table.Cell
// 					isLast={false}
// 					{...color}
// 				>
// 					<div className={cx("title-detail", "amount")}>{"Số lượng"}</div>
// 				</Table.Cell>
// 				<Table.Cell
// 					isLast={false}
// 					{...color}
// 				>
// 					<div className={cx("title-detail", "price")}>{"Giá"}</div>
// 				</Table.Cell>
// 				<Table.Cell
// 					isLast={false}
// 					{...color}
// 				>
// 					<div className={cx("title-detail", "sum")}>{"Tổng(VND)"}</div>
// 				</Table.Cell>
// 			</Table.Head>
// 			<Table.Body>
// 				{receipt.products.map((product) => {
// 					let sum = product.sum ? product.sum : product.price * product.amount;
// 					sumAllProduct += sum;
// 					return (
// 						<Table.Row>
// 							<Table.Cell
// 								isLast={false}
// 								colSpan={2}
// 								colorChildren={color}
// 								align="left"
// 							>
// 								<div className={cx("body-detail", "name")}>{product.name}</div>
// 							</Table.Cell>
// 							<Table.Cell
// 								isLast={false}
// 								colorChildren={color}
// 							>
// 								<div className={cx("body-detail", "amount")}>
// 									{product.amount}
// 								</div>
// 							</Table.Cell>
// 							<Table.Cell
// 								isLast={false}
// 								colorChildren={color}
// 							>
// 								<div className={cx("body-detail", "price")}>
// 									{displayMoney(product.price, false)}
// 								</div>
// 							</Table.Cell>
// 							<Table.Cell
// 								isLast={false}
// 								colorChildren={color}
// 							>
// 								<div className={cx("body-detail", "sum")}>
// 									{`${displayMoney(sum, false)}`}
// 								</div>
// 							</Table.Cell>
// 						</Table.Row>
// 					);
// 				})}
// 				<ItemTotal
// 					title={constants.SUM_ALL_PRODUCT}
// 					sum={sumAllProduct}
// 				/>
// 				<ItemTotal title={constants.VOUCHER} />
// 				<ItemTotal
// 					spec={true}
// 					title={constants.PAY_ALL}
// 					sum={sumAllProduct}
// 				/>
// 			</Table.Body>
// 		</Table.Frame>
// 	);
// }

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
	const { shippingInfo, user, shippingMethod } = props;
	return (
		<OutlinedBox
			label={"Địa chỉ giao hàng"}
			classNames={cx("wrapper-contact")}
		>
			<PropContact
				title={constants.RECIPIENT}
				value={shippingInfo.fullName}
			/>
			<PropContact
				title={constants.PHONE}
				value={shippingInfo.phone}
			/>
			<PropContact
				title={constants.REGION}
				value={shippingInfo.region}
			/>
			<div className={cx("space")}>
				<PropContact
					title={constants.DISTRICT}
					value={shippingInfo.district}
				/>
				<PropContact
					title={constants.WARD}
					value={shippingInfo.ward}
				/>
			</div>

			<PropContact
				title={constants.ADDRESS}
				value={shippingInfo.address}
			/>
			<PropContact
				title={constants.SHIPPING_METHOD}
				value={shippingMethod}
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
