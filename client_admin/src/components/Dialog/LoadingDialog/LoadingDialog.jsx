import { Modal } from "antd";
import React, { useEffect } from "react";
import Loading from "~/components/Loading";
import loadStatus from "~/stores/statusLoad";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import * as successAnim from "~/assets/animations/successAnim.json";
import * as errorAnim from "~/assets/animations/errorAnim.json";
import * as loadingAnim from "~/assets/animations/loadingAnim.json";
import { actions } from "~/stores";
import styles from "./loadingDialog.module.scss";
import classNames from "classnames";

const cx = classNames.bind(styles);
const defaultOptions = {
	loop: true,
	autoplay: true,
	animationData: require("~/assets/animations/successAnim.json"),
	rendererSettings: {
		preserveAspectRatio: "xMidYMid slice",
	},
};
function LoadingDialog(props) {
	const { editMode, dispatchEditMode } = props;
	let anim;
	const displayStatus = (status, message) => {
		switch (status) {
			case loadStatus.loading:
				anim = loadingAnim;
				break;
			case loadStatus.error:
				anim = errorAnim;
				break;
			case loadStatus.success:
				anim = successAnim;
				break;
		}
		return status ? (
			<div className={cx("")}>
				<Player
					style={{ height: "200px", width: "200px" }}
					autoplay
					loop
					src={anim}
				/>
			</div>
		) : (
			<div></div>
		);
	};
	useEffect(() => {
		let timeOut;
		switch (editMode.statusLoad) {
			case loadStatus.error:
			case loadStatus.success:
				timeOut = setTimeout(() => dispatchEditMode(actions.setStatusLoad("")), 1500);
				break;
		}
		//	return timeOut && clearTimeout(timeOut);
	}, [editMode.statusLoad]);
	return (
		<Modal
			closable={false}
			centered
			open={editMode.statusLoad !== ""}
			footer={null}
		>
			{editMode.statusLoad && displayStatus(editMode.statusLoad, editMode.statusMessage)}
		</Modal>
	);
}

export default LoadingDialog;
