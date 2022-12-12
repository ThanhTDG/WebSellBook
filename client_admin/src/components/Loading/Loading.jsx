import React from "react";
import classNames from "classnames/bind";
import { ClimbingBoxLoader, ClipLoader } from "react-spinners";

import styles from "./loading.module.scss";

const cx = classNames.bind(styles);

function Loading(props) {
	const { className = null, size = 20, isLoading = true, children } = props;
	return (
		<>
			{isLoading ? (
				<div className={cx("wrapper")}>
					<div className={cx("spinner")}>
						<ClimbingBoxLoader
							color="#001344"
							size={size}
							speedMultiplier={5}
						/>
					</div>
				</div>
			) : (
				children
			)}
		</>
	);
}

export default Loading;
