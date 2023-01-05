import classNames from "classnames/bind";
import React, { Children } from "react";
import styles from "./orderTable.module.scss";
import Table from "~/components/table/components";
import { constants } from "~/stores";
import Image from "~/components/Image";
import { displayMoney } from "~/utils/display";
import StatusPayment from "~/components/Dialog/StatusPayment/StatusPayment";
import { icons } from "~/assets/images";
import statusOrder from "~/stores/Order/statusOrder";

const cx = classNames.bind(styles);

function OrderTable(props) {
	const { maxHeight, order, showTotal = true, classImage, handleChange } = props;
	console.log(order);
	const color = classImage ? {} : { backgroundColor: "#FFFFFF", color: "#051e34" };
	let sumAllProduct = (items) => {
		let sum = 0;
		items.forEach((item) => {
			sum += item.total;
		});
		return sum;
	};
	let style = maxHeight ? { maxHeight: maxHeight } : {};
	return (
		<Table.Frame style={style}>
			<Table.Head>
				<Table.Cell
					isLast={false}
					{...color}
					align="right"
				>
					STT
				</Table.Cell>
				{classImage && (
					<Table.Cell
						isLast={false}
						{...color}
						align="left"
					/>
				)}
				<Table.Cell
					isLast={false}
					{...color}
					align="left"
				>
					<div className={cx("title-detail", "name", "single-line")}>{"Sách"}</div>
				</Table.Cell>
				<Table.Cell
					isLast={false}
					{...color}
					align="left"
				/>
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
				{order.items.map((item, index) => {
					return (
						<Table.Row>
							<Table.Cell
								isLast={false}
								colorChildren={color}
								align="right"
							>
								<div className={cx("body-detail", "stt")}>{index + 1}</div>
							</Table.Cell>
							{classImage && (
								<Table.Cell
									isLast={false}
									colorChildren={color}
									align="left"
								>
									<div className={cx("body-detail-image", classImage)}>
										<Image
											className={cx("image")}
											src={item.book.images && item.book.images.length > 0 ? item.book.images[0] : ""}
										/>
									</div>
								</Table.Cell>
							)}
							<Table.Cell
								isLast={false}
								colorChildren={color}
								colSpan={2}
								align="left"
							>
								<div className={cx("body-detail", "name")}>{item.book.name}</div>
							</Table.Cell>

							<Table.Cell
								isLast={false}
								colorChildren={color}
							>
								<div className={cx("body-detail", "quantity")}>{item.quantity}</div>
							</Table.Cell>
							<Table.Cell
								isLast={false}
								colorChildren={color}
							>
								<div className={cx("body-detail", "price")}>{displayMoney(item.book.price, false)}</div>
							</Table.Cell>
							<Table.Cell
								isLast={false}
								colorChildren={color}
							>
								<div className={cx("body-detail", "sum")}>{displayMoney(item.total, false)}</div>
							</Table.Cell>
						</Table.Row>
					);
				})}
				{showTotal && (
					<>
						<ItemTotal
							title={constants.PROVISIONAL}
							sum={sumAllProduct(order.items)}
						/>
						<ItemTotal
							title={constants.DISCOUNT}
							sum={order.discount ? `(${displayMoney(order.discount, false)})` : ""}
						/>
						<ItemTotal
							title={constants.TRANSPORT_FEE}
							sum={displayMoney(order.transportFee ? order.transportFee : 0, false)}
						/>
						{order.paymentMethod !== constants.CASH_ON_DELIVERY && (
							<>
								<ItemTotal
									name={"total-money"}
									title={constants.TOTAL_MONEY}
									sum={displayMoney(order.total)}
								/>
								<ItemTotal
									name={"paid"}
									title={constants.PAID}
									sum={`(${displayMoney(order.paid)})`}
								/>
							</>
						)}
						<ItemTotal
							name={"total-done"}
							title={constants.TOTAL_DONE}
							sum={displayMoney(order.total - order.paid)}
						/>
						<PaymentMethod title={constants.METHOD}>
							<div className={cx("wrapper-payment")}>
								<div className={cx("title-payment")}>{order.paymentMethod}</div>
								{order.paymentMethod !== constants.CASH_ON_DELIVERY
									? icons.Button({ className: cx("paid") }).paid
									: icons.Button({ className: cx("cash-on-delivery") }).cashOnDelivery}
							</div>
						</PaymentMethod>
						{order.paymentMethod !== constants.CASH_ON_DELIVERY &&
							order.status !== statusOrder.canceled &&
							order.status !== statusOrder.completed && (
								<PaymentMethod title={constants.STATUS_ORDER}>
									<StatusPayment
										data={order}
										className={""}
										onOk={handleChange}
									/>
								</PaymentMethod>
							)}
					</>
				)}
			</Table.Body>
		</Table.Frame>
	);
}
function PaymentMethod(props) {
	const { title, children } = props;
	return (
		<Table.Row>
			<EmptyColum />
			<Table.Cell colSpan={2}>
				<div className={cx("")}>{title}</div>
			</Table.Cell>
			<Table.Cell colSpan={2}>{children}</Table.Cell>
		</Table.Row>
	);
}
function ItemTotal(props) {
	const { title = "", value = "", sum = "", name } = props;
	const color = { backgroundColor: "#FFFfFF", color: "#051e34" };
	return (
		<Table.Row>
			<EmptyColum />
			<Table.Cell
				isLast={false}
				colorChildren={color}
				className={cx("title-item-total")}
			>
				<div className={cx(`${name}-title}`)}>{title}</div>
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
				<div className={cx(`${name}-value`)}>{value}</div>
			</Table.Cell>
			<Table.Cell
				isLast={false}
				colorChildren={color}
				className={cx("sum-item-total")}
			>
				<div className={cx(`${name}-sum`)}>{sum}</div>
			</Table.Cell>
		</Table.Row>
	);
}
function EmptyColum() {
	return (
		<>
			<td className={cx("white")}></td>
			<td className={cx("white")}></td>
		</>
	);
}
export default OrderTable;
