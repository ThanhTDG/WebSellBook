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
import OrderTable from "~/components/table/OrderTable";
import { orderService } from "~/services";
import { actions, constants, cusReducer } from "~/stores";
import statusOrder, { refListStatus } from "~/stores/Order/statusOrder";
import ButtonStatusOrder from "~/components/Dialog/ButtonStatusOrder/ButtonStatusOrder";
import Popper from "~/components/Popper";
import typeUser from "~/stores/types/typeUser";
import tabStyle from "~/components/tab/tabTable.module.scss";
import orderConfig from "~/stores/Order";
import SearchBar from "~/components/SearchBar";

const statuses = orderConfig.status;
const listStatus = orderConfig.listStatus;
const options = orderConfig.options;
const refList = refListStatus;
const cx = classNames.bind(styles);
const tabTableStyles = classNames.bind(tabStyle);
function ReceiptsPage() {
	const [tableTab, dispatchTableTab] = useReducer(cusReducer.reducers.TabTableReduce, cusReducer.initStates.receipts);
	const [isLoading, setIsLoading] = useState(true);
	const [editMode, dispatchEditMode] = useReducer(
		cusReducer.reducers.EditModeReducer,
		cusReducer.initStates.editModeState
	);
	const [idSelected, setIdSelected] = useState("");
	const [filter, setFilter] = useState(cusReducer.initStates.filterOrder);
	const [isUpdate, setIsUpdate] = useState(true);
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
		const { page, limit, totalPages } = response;
		dispatchTableTab(actions.setNewPropTable({ page, limit, totalPages }));
		setOrders(response.docs);
	};
	useEffect(() => {
		if (isUpdate) {
			fetchApi();
		}
		setIsUpdate(!isUpdate);
	}, [tableTab]);

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
		console.log(optionSelected);
		dispatchTableTab(
			actions.setStatusTable({
				indexStatus: optionSelected,
				status: statuses[listStatus[optionSelected].key],
			})
		);
	};
	const handleTypeSearchChange = (e) => {
		setFilter({ ...filter, typeSearch: e.target.value });
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
	let displayStatus = tableTab.indexStatus === 0;
	return (
		<InfoLayout
			editMode={editMode}
			dispatchEditMode={dispatchEditMode}
			showFeature={false}
		>
			<div className={cx("wrapper")}>
				<Tabs
					onChange={handleTabChange}
					value={tableTab.indexStatus}
					items={listStatus}
				>
					<div className={tabTableStyles("tool-filter")}>
						<div className={tabTableStyles("top")}>
							<Controls.Select
								size="small"
								labelInside={true}
								label={options.typeSearch.name}
								className={tabTableStyles("type-search")}
								items={options.typeSearch.value}
								onChange={handleTypeSearchChange}
								value={filter.typeSearch}
							/>
							<SearchBar
								className={tabTableStyles("search-box")}
								size="small"
								value={filter.search}
								onChange={handleSearchChange}
							/>
							<Controls.Button
								primary
								onClick={handleConfirm}
								className={tabTableStyles("confirm")}
							>
								{constants.CONFIRM}
							</Controls.Button>
						</div>

						<div className={tabTableStyles("bottom")}>
							<Controls.Select
								none={true}
								noneLabel="Không"
								size="small"
								labelInside={true}
								label={options.typeSort.name}
								className={tabTableStyles("sort-select")}
								items={options.typeSort.value}
								onChange={handleSortChange}
								value={filter.sort}
							/>
						</div>
					</div>
					<Loading
						isLoading={isLoading}
						className={cx("loading")}
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
													dispatchEditMode={dispatchEditMode}
													editMode={editMode}
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
					</Loading>
				</Tabs>
			</div>
		</InfoLayout>
	);
}
function RowOrder(props) {
	const { idSelected, setIdSelected, dispatchEditMode, order, showStatus = false } = props;
	const [receipt, setReceipt] = useState(order);
	const UpdateOrder = async (orderChange) => {
		dispatchEditMode(actions.setStatusIsLoading());
		const response = await orderService.updateOrder(orderChange, order.id);
		if (response) {
			dispatchEditMode(actions.setStatusIsSuccess());
			setReceipt(response);
		} else {
			dispatchEditMode(actions.setStatusIsError());
		}
	};
	const handleUpdateOrder = (orderChange) => {
		if (JSON.stringify(orderChange) !== JSON.stringify(order)) {
			UpdateOrder(orderChange);
		}
	};
	const currentIndex = receipt ? refList.findIndex((item) => item.key === receipt.status) : 0;
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
						<div className={cx("body", "status")}>{constants[receipt.status.toUpperCase()]}</div>
					</Table.Cell>
				)}
				<Table.Cell align={"left"}>
					<div className={cx("body", "recept-pay-method")}>{receipt.paymentMethod}</div>
				</Table.Cell>
				<Table.Cell isLast={false}>
					<div className={cx("body", "recept-user")}>
						{order.user ? (
							<Popper.UserDetail
								user={order.user}
								type={typeUser.customer}
							>
								<Link
									to={generatePath(PageConfig.customer.route, {
										id: order.user.id,
									})}
									target="_blank"
								>
									<div className={"single-line"}>{order.user.email}</div>
								</Link>
							</Popper.UserDetail>
						) : (
							constants.NOT_HAVE
						)}
					</div>
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
							<OrderTable
								handleChange={handleUpdateOrder}
								maxHeight={450}
								order={receipt}
							/>
							<div className={cx("feature")}>
								<div className={cx("contact-action")}>
									<Contact
										shippingInfo={receipt.shippingInfo}
										shippingMethod={receipt.shippingMethod}
										user={receipt}
									/>
									{order.status !== statusOrder.canceled && order.status !== statusOrder.completed && (
										<div className={cx("wrapper-action")}>
											<ButtonStatusOrder
												status={refList[currentIndex + 1].key}
												onOk={handleUpdateOrder}
												order={order}
												className={cx("btn-next", `btn-${refList[currentIndex + 1].key.replace("_", "-")}`)}
											></ButtonStatusOrder>
											<ButtonStatusOrder
												status={refList[0].key}
												onOk={handleUpdateOrder}
												order={order}
												className={cx("btn-cancel", `btn-${refList[0].key.replace("_", "-")}`)}
											></ButtonStatusOrder>
										</div>
									)}
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

function Contact(props) {
	const { shippingInfo, user, shippingMethod } = props;
	return (
		<OutlinedBox
			label={"Địa chỉ giao hàng"}
			classNameHeader={cx("wrapper-contact")}
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
				title={constants.STREET}
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
