import classNames from "classnames/bind";
import React, { useState, useReducer } from "react";

import Controls from "~/components/controls";
import ItemOrder from "~/components/Items/ItemOrderFull/ItemOrderFull";
import InfoLayout from "~/layouts/InfoLayout";
import { actions, constants, cusReducer } from "~/stores";

import styles from "./receiptPage.module.scss";
import fake from "~/pages/Receipt/fakeReceipt";
import { displayAddress, displayDay, displayMoney, displayTime } from "~/utils/display";
import statusOrder, { refListStatus } from "~/stores/Order/statusOrder";
import Popper from "~/components/Popper";
import typeUser from "~/stores/types/typeUser";
import { generatePath, Link, useParams } from "react-router-dom";
import PageConfig from "~/stores/pages";
import OrderTable from "~/components/table/OrderTable";
import Loading from "~/components/Loading";
import { orderService, userService } from "~/services";
import { useEffect } from "react";
import UpdateShipping from "~/components/Dialog/UpdateShipping/UpdateShipping";
import ButtonStatusOrder from "~/components/Dialog/ButtonStatusOrder/ButtonStatusOrder";
import { icons } from "~/assets/images";
import StatusPayment from "~/components/Dialog/StatusPayment/StatusPayment";
const cx = classNames.bind(styles);

const refList = refListStatus;
function convertListStatus(process) {
	return Object.keys(process)
		.map((item) => {
			if (process[item] != null) {
				let status = new Object();
				status.type = item;
				status.date = process[item];
				return status;
			}
			return null;
		})
		.filter((item) => item);
}

function ReceiptPage() {
	const { id } = useParams();
	const [editMode, dispatchEditMode] = useReducer(
		cusReducer.reducers.EditModeReducer,
		cusReducer.initStates.editModeState
	);
	const [order, setOrder] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [user, setUser] = useState(null);

	useEffect(() => {
		fetchAPI();
	}, []);
	const fetchAPI = async () => {
		setIsLoading(true);
		const response = await orderService.getOrderById(id);
		if (response) {
			setOrder(response);
		} else {
			console.log("Lỗi");
		}
		setIsLoading(false);
	};
	const UpdateOrder = async (orderChange) => {
		dispatchEditMode(actions.setStatusIsLoading());
		const response = await orderService.updateOrder(orderChange, id);
		if (response) {
			dispatchEditMode(actions.setStatusIsSuccess());
			setOrder(response);
		} else {
			dispatchEditMode(actions.setStatusIsError());
		}
	};
	const handleUpdateOrder = (orderChange) => {
		UpdateOrder(orderChange);
	};
	const currentIndex = order ? refList.findIndex((item) => item.key === order.status) : 0;
	return (
		<InfoLayout
			id={id}
			editMode={editMode}
			showFeature={false}
			typeModel={constants.ORDER}
			dispatchEditMode={dispatchEditMode}
			moreName={order ? order.orderCode : ""}
		>
			<Loading isLoading={isLoading}>
				{order && (
					<div className={cx("wrapper")}>
						<div className={cx("display")}>
							<div className={cx("products")}>
								<OrderTable
									maxHeight={700}
									order={order}
									showImage={true}
									showTotal={false}
									classImage={cx("image")}
								/>
							</div>
							<div className={cx("other")}>
								<Address
									shippingInfo={order.shippingInfo}
									user={order.user}
								/>
								<Changer
									order={order}
									handleChange={handleUpdateOrder}
								/>
								<Transport order={order} />
								<StatusOrder
									status={order.status}
									listStatus={convertListStatus(order.process)}
								/>
								{order.status !== statusOrder.canceled && order.status !== statusOrder.completed && (
									<div className={cx("actions")}>
										<ButtonStatusOrder
											status={refList[0].key}
											onOk={handleUpdateOrder}
											order={order}
											className={cx("btn-cancel", `btn-${refList[0].key.replace("_", "-")}`)}
										></ButtonStatusOrder>
										<ButtonStatusOrder
											status={refList[currentIndex + 1].key}
											onOk={handleUpdateOrder}
											order={order}
											className={cx("btn-next", `btn-${refList[currentIndex + 1].key.replace("_", "-")}`)}
										></ButtonStatusOrder>
									</div>
								)}
							</div>
						</div>
					</div>
				)}
			</Loading>
		</InfoLayout>
	);
}
function StatusOrder(props) {
	const { status, listStatus } = props;

	return (
		<div className={cx("statuses", status.replace("_", "-"))}>
			<div className={cx("title")}>{constants[status.toUpperCase()]}</div>
			<PropDisplay
				name="status-header"
				tail=""
				title={constants.STATUS_ODER}
				value={constants.RECORD_TIME}
			/>
			<div className={cx("content")}>
				{listStatus.map((status) => {
					let name = "status";
					if (statusOrder.canceled === status.type) {
						name = "canceled";
					} else if (statusOrder.completed === status.type) {
						name = "completed";
					}
					return (
						<PropDisplay
							name={name}
							tail=""
							title={constants[status.type.toUpperCase()]}
							value={displayTime(status.date)}
						/>
					);
				})}
			</div>
		</div>
	);
}

function Changer(props) {
	const { order, handleChange } = props;
	const sumAllProduct = (array) => {
		let sum = 0;
		array.forEach((element) => {
			sum += element.total;
		});
		return sum;
	};
	return (
		<div className={cx("changer")}>
			<div className={cx("title")}>Thanh toán</div>
			<div className={cx("content")}>
				<PropDisplay
					name="pay"
					tail=""
					title={constants.PROVISIONAL}
					value={displayMoney(sumAllProduct(order.items), false)}
				/>
				<PropDisplay
					name="pay"
					tail=""
					title={constants.DISCOUNT}
					value={order.discount ? `(${displayMoney(order.discount, false)})` : ""}
				/>
				<PropDisplay
					name="pay"
					tail=""
					title={constants.TRANSPORT_FEE}
					value={order.transportFee ? `${displayMoney(order.transportFee, false)}` : ""}
				/>
				{order.paymentMethod !== constants.CASH_ON_DELIVERY && (
					<>
						<PropDisplay
							name="total-play"
							tail=""
							title={constants.TOTAL_MONEY}
							value={displayMoney(order.total)}
						/>
						<PropDisplay
							name="pay"
							tail=""
							title={constants.PAID}
							value={`(${displayMoney(order.paid)})`}
						/>
					</>
				)}
				<PropDisplay
					name="total-done"
					tail=""
					title={constants.TOTAL_DONE}
					value={displayMoney(order.total - order.paid)}
				/>

				<PropDisplay
					name="payment-method"
					tail=""
					title={constants.METHOD}
					value={
						<div className={cx("wrapper-payment")}>
							<div className={cx("title-payment")}>{order.paymentMethod}</div>
							{order.paymentMethod !== constants.CASH_ON_DELIVERY
								? icons.Button({ className: cx("paid") }).paid
								: icons.Button({ className: cx("cash-on-delivery") }).cashOnDelivery}
						</div>
					}
				/>
				{order.paymentMethod !== constants.CASH_ON_DELIVERY &&
					order.status !== statusOrder.canceled &&
					order.status !== statusOrder.completed && (
						<>
							<PropDisplay
								name="status-order"
								tail=""
								title={constants.STATUS_ORDER}
								value={
									<StatusPayment
										data={order}
										className={""}
										onOk={handleChange}
									/>
								}
							/>
						</>
					)}
			</div>
		</div>
	);
}
function Transport(props) {
	const { order } = props;
	return (
		<div className={cx("transport")}>
			<div className={cx("title")}>{constants.TRANSPORT}</div>
			<div className={cx("content")}>
				<PropDisplay
					name="transport"
					title={constants.TRANSPORT}
					value={order.shippingMethod}
				/>
				<PropDisplay
					name="transport"
					title={constants.SHIPPING_CODE}
					value={order.shippingCode}
				/>
				<PropDisplay
					name="transport-fee"
					title={constants.TRANSPORT_FEE}
					value={displayMoney(order.transportFee)}
				/>
			</div>
		</div>
	);
}
function Address(props) {
	const { shippingInfo, user = null } = props;
	return (
		<div className={cx("address")}>
			<div className={cx("title")}>Địa chỉ người nhận</div>
			<div className={cx("content")}>
				<PropDisplay
					name="address"
					title={constants.ACCOUNT}
					value={
						user ? (
							<Popper.UserDetail
								user={user}
								type={typeUser.customer}
							>
								<Link
									to={generatePath(PageConfig.customer.route, {
										id: user.id,
									})}
									target="_blank"
								>
									<div className={"single-line"}>{user.email}</div>
								</Link>
							</Popper.UserDetail>
						) : (
							constants.NOT_HAVE
						)
					}
				/>
				<PropDisplay
					name="address"
					title={constants.NAME}
					value={shippingInfo.fullName}
				/>
				<PropDisplay
					name="address"
					title={constants.PHONE_NUMBER}
					value={shippingInfo.phone}
				/>
				<PropDisplay
					name="address"
					title={constants.STREET}
					value={displayAddress(shippingInfo)}
				/>
			</div>
		</div>
	);
}
function PropDisplay(props) {
	const { title = "", value = "", name = "", tail = ":" } = props;
	return (
		<div className={cx(`${name}-prop`, "wrapper-prop")}>
			<div className={cx(`${name}-title`, "prop-title")}>{`${title}${tail}`}</div>
			<div className={cx(`${name}-value`)}>{value}</div>
		</div>
	);
}

export default ReceiptPage;
