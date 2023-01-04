import classNames from "classnames/bind";
import React from "react";
import { constants } from "~/stores";

import styles from "./updatePaid.module.scss";
const cx = classNames.bind(styles);
function UpdatePaid(order) {
	const { data, title = `${constants.PAID}`, children, onOk, className } = props;
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
		onOk({ ...order, status: statusOrder.shipping });
	};
	return (
		<>
			<Controls.Button
				className={className}
				onClick={handleOpen}
			>
				{children}
			</Controls.Button>
			<Modal
				className={cx("dialog")}
				title={title}
				centered
				open={isOpen}
				onOk={handleOk}
				onCancel={handleClose}
			>
				<div className={cx("wrapper")}>
					<Controls.Input
						type="number"
						name="paid"
						label={constants.PAID}
						value={order.paid}
						onChange={handleInputChange}
					/>
				</div>
			</Modal>
		</>
	);
}

export default UpdatePaid;
