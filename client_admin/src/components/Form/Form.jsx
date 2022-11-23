import classNames from "classnames/bind";
import React from "react";
import styles from "./form.module.scss";
const cx = classNames.bind(styles);

function Form(props) {
	const { children, ...other } = props;
	return (
		<form className={cx("wrapper")} autoComplete="off" {...other}>
			{props.children}
		</form>
	);
}

export default Form;
