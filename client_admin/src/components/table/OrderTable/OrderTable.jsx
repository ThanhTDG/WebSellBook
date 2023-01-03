import classNames from "classnames/bind";
import React from "react";
import styles from "./orderTable.module.scss";
import Table from "~/components/table/components";
import { constants } from "~/stores";
import Image from "~/components/Image";
import { displayMoney } from "~/utils/display";

const cx = classNames.bind(styles);

function OrderTable(props) {
	const { order, showImage = false, showTotal = true } = props;
	console.log(order);
	const color = showImage
		? {
				book: {
					_id: "634ed8e4f6a3a7266d99276d",
					name: "Thiên Sứ Nhà Bên – Tập 3",
					images: ["https://salt.tikicdn.com/ts/product/01/93/08/61e928ce145c06a11a483ed49d826da2.jpg"],
					originalPrice: 95000,
					discountRate: 25,
					price: 72000,
				},
				quantity: 1,
				total: 72000,
		  }
		: { backgroundColor: "#FFFFFF", color: "#051e34" };
	let sumAllProduct = (items) => {
		let sum = 0;
		items.forEach((item) => {
			sum += item.total;
		});
		return sum;
	};
	return (
		<Table.Frame>
			<Table.Head>
				{showImage && (
					<Table.Cell
						isLast={false}
						{...color}
						align="left"
					/>
				)}
				<Table.Cell
					isLast={false}
					{...color}
					colSpan={2}
					align="left"
				>
					<div className={cx("title-detail", "name", "single-line")}>{"Sách"}</div>
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
				{order.items.map((item) => {
					return (
						<Table.Row>
							{showImage && (
								<Table.Cell
									isLast={false}
									colSpan={2}
									colorChildren={color}
									align="left"
								>
									<div className={cx("body-detail", "image")}>
										<Image src={item.book.images && item.book.images.length > 0 ? item.book.images[0] : ""} />
									</div>
								</Table.Cell>
							)}
							<Table.Cell
								isLast={false}
								colSpan={2}
								colorChildren={color}
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
						<ItemTotal
							spec={true}
							title={constants.PAY_ALL}
							sum={displayMoney(order.total)}
						/>
					</>
				)}
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
export default OrderTable;
