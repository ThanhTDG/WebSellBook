import { Modal } from "antd";
import React, { useEffect } from "react";
import Loading from "~/components/Loading";
import loadStatus from "~/stores/statusLoad";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import * as successAnim from "~/assets/animations/successAnim.json";
import * as errorAnim from "~/assets/animations/errorAnim.json";
import * as loadingAnim from "~/assets/animations/loadingAnim.json";
import { actions } from "~/stores";

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
	const displayStatus = (status) => {
		switch (status) {
			case loadStatus.loading:
				return (
					<Player
						autoplay
						loop
						src={loadingAnim}
					/>
				);
			case loadStatus.error:
				return (
					<Player
						autoplay
						loop
						src={errorAnim}
					/>
				);
			case loadStatus.success:
				return (
					<Player
						autoplay
						loop
						src={successAnim}
					/>
				);
		}
	};
	useEffect(() => {
		let timeOut;
		switch (editMode.statusLoad) {
			case loadStatus.error:
			case loadStatus.success:
				timeOut = setTimeout(() => dispatchEditMode(actions.setStatusLoad("")), 2000);
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
			{displayStatus(editMode.statusLoad)}
		</Modal>
	);
}

export default LoadingDialog;
