import React from "react";
import classNames from "classnames/bind";
import { ClimbingBoxLoader, ClipLoader } from "react-spinners";

import styles from "./loading.module.scss";

const cx = classNames.bind(styles);

function Loading(props) {
	const { className = null, height, size = 20 } = props;
	return (
		<div
			style={{ height: height }}
			className={cx("wrapper")}
		>
			<div className={cx("spinner")}>
				<ClimbingBoxLoader
					color="#001344"
					size={size}
					speedMultiplier={5}
				/>
			</div>
		</div>
	);
}

export default Loading;
