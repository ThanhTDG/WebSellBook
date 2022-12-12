import React from "react";
import classNames from "classnames/bind";

import styles from "./headerComp.module.scss";
import Image from "../Image";
import images from "~/assets/images";
const cx = classNames.bind(styles);
function HeaderComp(props) {
	const { className } = props;
	return (
		<div className={cx("wrapper", { [className]: className })}>
			<Image src={images.logoAndText} />
		</div>
	);
}

export default HeaderComp;
