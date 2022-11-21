import Tippy from "@tippyjs/react/headless";
import React from "react";
import classNames from "classnames/bind";

import styles from "./detailProduct.module.scss";
import { PopperWrapper } from "../Wrapper";
import Content from "./Content";

const cx = classNames.bind(styles);
function DetailProduct(props) {
	const { children, product } = props;

	return (
		<Tippy
			placement="bottom-end"
			interactive
			delay={[700, 200]}
			render={(attrs) => {
				return (
					<div
						className={cx("detail")}
						tabIndex="-1"
						{...attrs}
					>
						<PopperWrapper>
							<Content product={product} />
						</PopperWrapper>
					</div>
				);
			}}
		>
			{children}
		</Tippy>
	);
}

export default DetailProduct;
