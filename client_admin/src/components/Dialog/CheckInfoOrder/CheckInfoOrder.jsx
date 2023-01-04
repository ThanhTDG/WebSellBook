import Modal from "antd/es/modal/Modal";
import classNames from "classnames/bind";
import React from "react";
import { useState } from "react";
import Controls from "~/components/controls";
import { constants } from "~/stores";
import unit from "~/stores/ComponentConfigs/unit";
import statusOrder from "~/stores/Order/statusOrder";

import styles from "./checkInfoOrder.module.scss";

const cx = classNames.bind(styles);
function CheckInfoOrder(props) {
	const { data, title = `${constants.CONFIRM} ${constants.ORDER_INFORMATION.toLowerCase()}`, onOk, className } = props;
	const [order, setOrder] = useState(data);
	const [isOpen, setIsOpen] = useState(false);
	const handleInputChange = (e) => {
		let name = e.target.name;
		let value = e.target.value;
		if (e.target.type === "number") {
			if (value) {
				setOrder({
					...order,
					[name]: value,
				});
			}
		} else {
			setOrder({
				...order,
				[name]: value,
			});
		}
	};
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
		onOk({ ...order, status: statusOrder.processing });
	};
	return (
		<>
			<Controls.Button
				primary
				className={className}
				onClick={handleOpen}
			>
				{constants.NOT_PROCESSED_NEXT}
			</Controls.Button>
			<Modal
				className={cx("dialog")}
				title={title}
				centered
				open={isOpen}
				onOk={handleOk}
				onCancel={handleClose}
			>
				{order && (
					<div className={cx("wrapper")}>
						<Controls.Input
							name="shippingMethod"
							label={constants.TRANSPORT}
							value={order.shippingMethod}
							onChange={handleInputChange}
						/>
						<Controls.Input
							name="transportFee"
							label={constants.TRANSPORT_FEE}
							value={order.transportFee}
							configNumber={{ min: 0, max: constants.MAX_NUMBER, step: 100 }}
							endAdornment={unit.monetary}
							onChange={handleInputChange}
							type={"number"}
						/>
					</div>
				)}
			</Modal>
		</>
	);
}

export default CheckInfoOrder;
