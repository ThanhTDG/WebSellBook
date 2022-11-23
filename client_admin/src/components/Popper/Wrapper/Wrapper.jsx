import React from "react";
import classNames from "classnames/bind";
import styles from "./wrapper.module.scss";

const cx = classNames.bind(styles);
function Wrapper(props) {
	const { children } = props;
	return <div className={cx("wrapper")}>{children}</div>;
}

export default Wrapper;
