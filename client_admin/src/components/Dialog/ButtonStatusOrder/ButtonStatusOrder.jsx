import Modal from "antd/es/modal/Modal";
import classNames from "classnames/bind";
import React from "react";
import { useState } from "react";
import Controls from "~/components/controls";
import { constants } from "~/stores";
import statusOrder from "~/stores/Order/statusOrder";
import CheckInfoOrder from "../CheckInfoOrder/CheckInfoOrder";
import UpdateShipping from "../UpdateShipping/UpdateShipping";

import styles from "./buttonStatusOrder.module.scss";
const cx = classNames.bind(styles);
function ButtonStatusOrder(props) {
	const { status, order, children, onOk, className } = props;

	switch (status) {
		case statusOrder.processing:
			return (
				<CheckInfoOrder
					data={order}
					onOk={onOk}
					className={cx("btn-check-info", className)}
				>
					{children}
				</CheckInfoOrder>
			);
		case statusOrder.shipping:
			return (
				<UpdateShipping
					data={order}
					onOk={onOk}
					className={className}
				>
					{children}
				</UpdateShipping>
			);
		case statusOrder.completed:
			return (
				<UpdateCompleted
					data={order}
					onOk={onOk}
					className={className}
				>
					{children}
				</UpdateCompleted>
			);
		case statusOrder.canceled:
			return (
				<UpdateCancel
					data={order}
					onOk={onOk}
					className={className}
				>
					{children}
				</UpdateCancel>
			);
	}
}
function UpdateCompleted(props) {
	const {
		data,
		title = `${constants.CONFIRM} ${constants.COMPLETED.toLowerCase()}`,
		children,
		onOk,
		className,
	} = props;
	const [order, setOrder] = useState(data);
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
		onOk({ ...order, status: statusOrder.completed });
	};
	return (
		<>
			<Controls.Button
				primary
				className={cx("btn-completed", className)}
				onClick={handleOpen}
			>
				{constants.COMPLETED}
			</Controls.Button>
			<Modal
				className={cx("dialog-completed")}
				title={title}
				centered
				open={isOpen}
				onOk={handleOk}
				onCancel={handleClose}
			>
				<div className={cx("wrapper-completed")}>
					Bạn có muốn xác nhận đơn hàng này đã hoàn thành? sau khi thực hiện không thể thay đổi !!!
				</div>
			</Modal>
		</>
	);
}
function UpdateCancel(props) {
	const { data, title = `${constants.CONFIRM} ${constants.CANCELED.toLowerCase()}`, children, onOk, className } = props;
	const [order, setOrder] = useState(data);
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
		onOk({ ...order, status: statusOrder.canceled });
	};
	return (
		<>
			<Controls.Button
				outline
				className={cx("btn-cancel", className)}
				onClick={handleOpen}
			>
				{constants.CANCEL}
			</Controls.Button>
			<Modal
				className={cx("dialog-cancel")}
				title={title}
				centered
				open={isOpen}
				onOk={handleOk}
				onCancel={handleClose}
			>
				<div className={cx("wrapper-cancel")}>
					Bạn chắc chắn muốn hủy đơn hàng này, sau khi thực hiện không thể thay đổi ?
				</div>
			</Modal>
		</>
	);
}
export default ButtonStatusOrder;
