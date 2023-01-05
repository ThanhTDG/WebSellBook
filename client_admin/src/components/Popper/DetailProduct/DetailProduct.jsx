import Tippy from "@tippyjs/react/headless";
import React from "react";
import classNames from "classnames/bind";

import styles from "./detailProduct.module.scss";
import { PopperWrapper } from "../Wrapper";
import Content from "./Content";
import { useState } from "react";
import Loading from "~/components/Loading";
import { useEffect } from "react";
import { getProductById } from "~/services/productService";

const cx = classNames.bind(styles);
function DetailProduct(props) {
	const {
		children,
		product = null,
		id,
		showTippy = true,
		placement = "bottom-start",
	} = props;
	const [isLoading, setLoading] = useState(true);
	const [info, setInfo] = useState(product);
	useEffect(() => {
		if (product !== null) {
			setLoading(false);
		} else {
			fetchApi();
		}
	}, []);
	const fetchApi = async () => {
		const response = await getProductById(id);
		console.log(response);
		if (response) {
			setInfo(response);
			setLoading(false);
		} else {
			setLoading(false);
		}
	};

	return (
		<>
			{showTippy ? (
				<Tippy
					placement={placement}
					interactive
					delay={[700, 200]}
					render={(attrs) => {
						return (
							<div
								className={cx("detail")}
								tabIndex="-1"
								{...attrs}
							>
								<Loading isLoading={isLoading}>
									<PopperWrapper>
										<Content product={info} />
									</PopperWrapper>
								</Loading>
							</div>
						);
					}}
				>
					{children}
				</Tippy>
			) : (
				<Loading isLoading={isLoading}>
					<PopperWrapper>
						<Content product={info} />
					</PopperWrapper>
				</Loading>
			)}
		</>
	);
}

export default DetailProduct;
