import classNames from "classnames/bind";
import React from "react";
import PaidForm from "~/components/Form/PaidForm";
import { constants } from "~/stores";

import styles from "./updatePaid.module.scss";
const cx = classNames.bind(styles);
function UpdatePaid(order) {
	const { data, title = `${constants.PAID}`, children, onOk, className } = props;
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
				<PaidForm
					order={order}
					setOrder={setOrder}
					paid={paid}
				/>
			</Modal>
		</>
	);
}

export default UpdatePaid;
