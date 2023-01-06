import { Link } from "react-router-dom";
import { icons } from "~/assets/images";
import { type as typeWidget } from "./typeWidget.js";
import styles from "./widget.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
function Widget({ type, value }) {
	const amount = 100;
	const diff = 20;
	let data = typeWidget[type];
	let dataTitle = data.key;
	let positive = true;
	let negative = false;
	const classTitle = cx("title", {
		[dataTitle]: dataTitle,
	});
	const classIcon = cx("icon", {
		[dataTitle]: dataTitle,
	});
	const classPercentage = cx("percentage", {
		positive,
		negative,
	});
	return (
		<div className={cx("widget")}>
			<div className={cx("left")}>
				<span className={classTitle}>{data.title}</span>
				<span className={cx("counter")}>{value ? value : amount}</span>
				<Link className={cx("view")}>{data.link}</Link>
			</div>
			<div className={cx("right")}>
				<div className={classPercentage}>
					{icons.Chart({ classPercentage })["increase"]}
					{diff} %
				</div>
				<div className={cx("wrap-icon")}>{icons.Widget({ className: classIcon })[data.key]}</div>
			</div>
		</div>
	);
}

export default Widget;
