import React from "react";
import classNames from "classnames/bind";

import Controls from "~/components/controls";
import styles from "./createNUpdateDay.module.scss";
import { displayTime } from "~/utils/display";

const cx = classNames.bind(styles);

function CreateNUpdateDay(props) {
	const { createdAt = null, updatedAt = null, className } = props;
	return (
		<div className={cx("wrapper", className)}>
			<Controls.Input
				disabled={true}
				name="createdAt"
				label="Ngày khởi tạo"
				value={displayTime(createdAt)}
			/>
			<Controls.Input
				disabled={true}
				name="updateAt"
				label="Cập nhật lần cuối"
				value={displayTime(updatedAt)}
			/>
		</div>
	);
}

export default CreateNUpdateDay;
