import Modal from "antd/es/modal/Modal";
import classNames from "classnames/bind";
import React from "react";
import { useState } from "react";
import Controls from "~/components/controls";
import PaidForm from "~/components/Form/PaidForm";
import { constants } from "~/stores";
import unit from "~/stores/ComponentConfigs/unit";
import statusOrder from "~/stores/Order/statusOrder";
import { displayAddress } from "~/utils/display";

import styles from "./checkInfoOrder.module.scss";

const cx = classNames.bind(styles);
function CheckInfoOrder(props) {
	const {
		data,
		title = `${constants.CONFIRM} ${constants.ORDER_INFORMATION.toLowerCase()}`,
		onOk,
		className,
		children,
	} = props;
	const [order, setOrder] = useState(data);
	const [paid, setPaid] = useState(data.paid);
	const [isOpen, setIsOpen] = useState(false);
	const handleInputChange = (e) => {
		let name = e.target.name;
		let value = e.target.value;
		let array = name.split(".");
		if (array.length > 0) {
			setOrder({
				...order,
				[array[0]]: {
					...order[array[0]],
					[array[1]]: value,
				},
			});
		} else {
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
				{children ? children : constants.NOT_PROCESSED_NEXT}
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
							name="shippingInfo.fullName"
							label={constants.FULL_NAME}
							value={order.shippingInfo.fullName}
							onChange={handleInputChange}
						/>
						<Controls.Input
							name="shippingInfo.phone"
							label={constants.TRANSPORT}
							value={order.shippingInfo.phone}
							onChange={handleInputChange}
						/>
						<div className={cx("division")}>
							<Controls.Input
								name="shippingInfo.region"
								label={constants.REGION}
								value={order.shippingInfo.region}
								onChange={handleInputChange}
							/>
							<Controls.Input
								name="shippingInfo.district"
								label={constants.DISTRICT}
								value={order.shippingInfo.district}
								onChange={handleInputChange}
							/>
						</div>
						<Controls.Input
							name="shippingInfo.address"
							label={constants.STREET}
							value={order.shippingInfo.address}
							onChange={handleInputChange}
						/>
						<div className={cx("wrapper-address")}>
							<div className={cx("title-address")}>{constants.ADDRESS}</div>
							<div className={cx("value-address")}>{displayAddress(order.shippingInfo)}</div>
						</div>
						{order.paymentMethod !== constants.CASH_ON_DELIVERY && (
							<PaidForm
								order={order}
								setOrder={setOrder}
								paid={paid}
							/>
						)}
					</div>
				)}
			</Modal>
		</>
	);
}

export default CheckInfoOrder;
