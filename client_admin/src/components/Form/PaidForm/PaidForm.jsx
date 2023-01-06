import { display } from "@mui/system";
import classNames from "classnames/bind";
import React, { useState } from "react";
import Controls from "~/components/controls";
import { constants } from "~/stores";
import { displayMoney } from "~/utils/display";

import styles from "./paidFrom.module.scss";
const cx = classNames.bind(styles);
const paidList = [
	{ id: "0", name: constants.PAY_TOTAL },
	{ id: "1", name: constants.ONE_PART_PAID },
];
function PaidForm(props) {
	const { order, setOrder, paid } = props;
	const [paidState, setPaidState] = useState(order.total === order.paid ? 0 : order.paid > 0 ? 1 : null);
	const handleChangePaidState = (e, value) => {
		let id = e.target.value;
		setPaidState(e.target.value);
		if (id === "0") {
			setOrder({
				...order,
				paid: parseInt(order.total),
			});
		} else {
			setOrder({
				...order,
				paid: parseInt(0),
			});
		}
	};
	const handleInputChange = (e) => {
		let name = e.target.name;
		let value = e.target.value;
		if (e.target.type === "number") {
			console.log(value);
			if (parseInt(e.target.max) < parseInt(value)) {
				value = e.target.max;
			} else if (parseInt(e.target.min) > parseInt(value)) {
				value = e.target.min;
			}
			if (value) {
				setOrder({
					...order,
					[name]: parseInt(value),
				});
			}
		} else {
			setOrder({
				...order,
				[name]: value,
			});
		}
	};
	return (
		<div className={cx("wrapper")}>
			<div className={cx("division")}>
				<div className={cx("total-name")}>{constants.TOTAL_MONEY}:</div>
				<div className={cx("total-value")}>{displayMoney(order.total)}</div>
			</div>
			<Controls.RadioGroup
				items={paidList}
				value={paidState}
				onChange={handleChangePaidState}
			/>
			<Controls.Input
				type={"number"}
				name="paid"
				configNumber={{ min: 0, max: order.total, step: 100 }}
				label={constants.PAID}
				value={order.paid}
				onChange={handleInputChange}
			/>
			<div className={cx("division")}>
				<div className={cx("total-name")}>{constants.TOTAL_DONE}:</div>
				<div className={cx("total-all")}>{displayMoney(order.total - order.paid)}</div>
			</div>
		</div>
	);
}

export default PaidForm;
