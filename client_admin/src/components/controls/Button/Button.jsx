import React from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./Button.module.scss";
const cx = classNames.bind(styles);

function Button({
	to,
	href,
	rightIcon,
	leftIcon,
	primary = false,
	disable = false,
	rounded = false,
	text = false,
	outline = false,
	small = false,
	large = false,
	children,
	onClick,
	className,
	...passProps
}) {
	let Comp = "button";
	const props = {
		onClick,
		...passProps,
	};
	if (disable) {
		Object.keys(props).forEach((key) => {
			if (key.startsWith("on") && typeof props[key] === "function") {
				delete props[key];
			}
		});
	}
	if (to) {
		props.to = to;
		Comp = Link;
	} else if (href) {
		props.href = href;
		Comp = "a";
	}
	const classes = cx("btn", {
		[className]: className,
		primary,
		outline,
		text,
		rounded,
		disable,
		large,
		small,
	});
	return (
		<Comp
			className={classes}
			{...props}
		>
			{leftIcon && <span className={cx("icon")}>{leftIcon}</span>}
			<span className="title">{children}</span>
			{rightIcon && <span className={cx("icon")}>{rightIcon}</span>}
		</Comp>
	);
}

export default Button;
