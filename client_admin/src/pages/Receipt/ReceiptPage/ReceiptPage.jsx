import classNames from "classnames/bind";
import React, { useState, useReducer } from "react";

import Controls from "~/components/controls";
import ItemOrder from "~/components/Items/ItemOrderFull/ItemOrderFull";
import InfoLayout from "~/layouts/InfoLayout";
import { constants, cusReducer } from "~/stores";

import styles from "./receiptPage.module.scss";
import fake from "~/pages/Receipt/fakeReceipt";
import {
	displayAddress,
	displayDay,
	displayMoney,
	displayTime,
} from "~/utils/display";
import statusReceipt from "~/stores/Receipt/statusReceipt";
import Popper from "~/components/Popper";
import typeUser from "~/stores/types/typeUser";
import { generatePath, Link, useParams } from "react-router-dom";
import PageConfig from "~/stores/pages";
const cx = classNames.bind(styles);
const refList = [
	{
		key: "canceled",
		title: "Bị hủy",
		engTitle: "Canceled",
	},
	{
		key: "not_processed",
		title: "Chờ xử lý",
		engTitle: "waiting for processed",
	},
	{
		key: "processing",
		title: "Chờ xác nhận",
		engTitle: "Processing",
	},
	{
		key: "shipping",
		title: "Đang giao hàng",
		engTitle: "Shipping",
	},
	{
		key: "completed",
		title: "hoàn thành",
		engTitle: "completed",
	},
];
function ReceiptPage() {
	const { id } = useParams();
	const [receipt, setReceipt] = useState(fake[0]);
	const [editMode, dispatchEditMode] = useReducer(
		cusReducer.reducers.EditModeReducer,
		cusReducer.initStates.editModeState
	);

	const [listStatus, setListStatus] = useState(receipt.statuses);
	const [status, setStatus] = useState(receipt.status);
	const handleChangeStatus = (newStatus) => {
		setStatus(newStatus);
		let currList = listStatus;
		currList.push({ date: Date.now(), type: newStatus });
		setListStatus(currList);
	};
	const currentIndex = refList.findIndex((item) => item.key === status);
	return (
		<InfoLayout
			id={id}
			editMode={editMode}
			showFeature={false}
			dispatchEditMode={dispatchEditMode}
		>
			<div className={cx("wrapper")}>
				<div className={cx("display")}>
					<div className={cx("products")}>
						{receipt.products.map((product) => (
							<ItemOrder product={product} />
						))}
					</div>
					<div className={cx("other")}>
						<div className={cx("address")}>
							<div className={cx("title")}>Địa chỉ người nhận</div>
							<div className={cx("content")}>
								<PropDisplay
									name="address"
									title={constants.ACCOUNT}
									value={
										<Popper.UserDetail
											id={receipt.user.id}
											type={typeUser.customer}
										>
											<Link
												to={generatePath(PageConfig.customer.route, {
													id: receipt.user.id,
												})}
												target="_blank"
											>
												<div className={"single-line"}>
													{receipt.user.email}
												</div>
											</Link>
										</Popper.UserDetail>
									}
								/>
								<PropDisplay
									name="address"
									title={constants.NAME}
									value={receipt.address.fullName}
								/>
								<PropDisplay
									name="address"
									title={constants.PHONE_NUMBER}
									value={receipt.address.phone}
								/>

								<PropDisplay
									name="address"
									title={constants.ADDRESS}
									value={displayAddress(receipt.address)}
								/>
							</div>
						</div>
						<div className={cx("changer")}>
							<div className={cx("title")}>Thanh toán</div>
							<div className={cx("content")}>
								<PropDisplay
									name="type-pay"
									tail=""
									title={constants.TYPE}
									value={"Thanh toán khi nhận hàng"}
								/>
								<PropDisplay
									name="pay"
									tail=""
									title={constants.PROVISIONAL}
									value={displayMoney(100000)}
								/>
								<PropDisplay
									name="pay"
									tail=""
									title={constants.VOUCHER}
									value={displayMoney(0)}
								/>
								<div className={cx("total-play")}>
									<div className={cx("prop-title")}>
										{constants.TOTAL_MONEY}
									</div>
									<div className={cx("prop-total-pay")}>
										{displayMoney(100000)}
									</div>
								</div>
							</div>
						</div>
						<div className={cx("statuses", status.replace("_", "-"))}>
							<div className={cx("title")}>
								{constants[status.toUpperCase()]}
							</div>
							<PropDisplay
								name="status-header"
								tail=""
								title={constants.STATUS_ODER}
								value={constants.RECORD_TIME}
							/>
							<div className={cx("content")}>
								{listStatus.map((status) => {
									let name = "status";
									if (status.type === statusReceipt.canceled) {
										name = "canceled";
									} else if (status.type === statusReceipt.completed) {
										name = "completed";
									}
									return (
										<PropDisplay
											name={name}
											tail=""
											title={constants[status.type.toUpperCase()]}
											value={displayTime(Date.now())}
										/>
									);
								})}
							</div>
						</div>
						{status !== statusReceipt.canceled &&
							status !== statusReceipt.completed && (
								<div className={cx("actions")}>
									<Controls.Button
										outline
										onClick={() => {
											handleChangeStatus(refList[0].key);
										}}
										className={cx("btn-cancel")}
									>
										{constants.CANCEL}
									</Controls.Button>
									<Controls.Button
										className={cx("btn-next")}
										primary
										onClick={() => {
											handleChangeStatus(refList[currentIndex + 1].key);
										}}
									>
										{refList[currentIndex + 1].title}
									</Controls.Button>
								</div>
							)}
					</div>
				</div>
			</div>
		</InfoLayout>
	);
}
function PropDisplay(props) {
	const { title = "", value = "", name = "", tail = ":" } = props;
	return (
		<div className={cx(`${name}-prop`, "wrapper-prop")}>
			<div
				className={cx(`${name}-title`, "prop-title")}
			>{`${title}${tail}`}</div>
			<div className={cx(`${name}-value`)}>{value}</div>
		</div>
	);
}

export default ReceiptPage;
