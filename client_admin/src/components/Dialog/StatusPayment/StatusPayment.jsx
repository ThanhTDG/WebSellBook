import Modal from "antd/es/modal/Modal";
import classNames from "classnames/bind";
import React, { useState } from "react";
import { icons } from "~/assets/images";
import Controls from "~/components/controls";
import PaidForm from "~/components/Form/PaidForm";
import { constants } from "~/stores";

import styles from "./statusPayment.module.scss";
const cx = classNames.bind(styles);

function StatusPayment(props) {
	const { data, title = `${constants.CONFIRM} ${constants.COMPLETED.toLowerCase()}`, onOk, className } = props;
	const [order, setOrder] = useState(data);
	const [paid, setPaid] = useState(data.paid);
	const [isOpen, setIsOpen] = useState(false);
	const handleOpen = () => {
		if (!isOpen) {
			setIsOpen(true);
		}
	};
	const handleClose = () => {
		if (isOpen) {
			setOrder(data);
			setIsOpen(false);
		}
	};
	const handleOk = () => {
		handleClose();
		onOk({ ...order });
	};
	let string = order.paymentMethod;
	let icon = icons.Button({ className: cx("cash-on-delivery") }).cashOnDelivery;
	if (order.paid === 0) {
		string = constants.NOT_PAID;
		icon = icons.Button({ className: cx("not-paid") }).notPaid;
	} else if (order.paid === order.total) {
		string = constants.PAID_FULL;
		icon = icons.Button({ className: cx("paid-full") }).paidFull;
	} else {
		string = constants.ONE_PART_PAID;
		icon = icons.Button({ className: cx("one-part-paid") }).onePartPaid;
	}
	return (
		<>
			<Controls.Button
				className={cx("btn-change-paid", className)}
				outline
				disabled={string === constants.CASH_ON_DELIVERY}
				onClick={handleOpen}
				rightIcon={icon}
			>
				{string}
			</Controls.Button>
			<Modal
				className={cx("dialog-completed")}
				title={title}
				centered
				open={isOpen}
				onOk={handleOk}
				onCancel={handleClose}
			>
				<PaidForm
					order={order}
					setOrder={setOrder}
					paid={paid}
				/>
			</Modal>
		</>
	);
}

export default StatusPayment;
