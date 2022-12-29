import Tippy from "@tippyjs/react";
import classNames from "classnames/bind";
import React from "react";
import { useState } from "react";
import images, { icons } from "~/assets/images";
import Controls from "../controls";
import Image from "../Image";
import { PopperWrapper } from "../Popper/Wrapper";

import styles from "./cardImage.module.scss";

const cx = classNames.bind(styles);
function CardImage(props) {
	const {
		className = null,
		classNameIcon,
		handleRemove,
		src,
		onClick,
		viewDetail = true,
		positionDetail = "top-end",
	} = props;

	return (
		<div className={cx("wrapper", className)}>
			{viewDetail ? (
				<Tippy
					placement={positionDetail}
					interactive
					animation="fade"
					delay={[600, 200]}
					content={
						<div className={cx("view-detail")}>
							<Image
								className={cx("image-card")}
								src={src}
							/>
						</div>
					}
				>
					<div className={cx("image-card")}>
						<Image
							onClick={onClick}
							className={cx("view")}
							src={src}
						/>
					</div>
				</Tippy>
			) : (
				<Image
					onClick={onClick}
					className={cx("image-card")}
					src={src}
				/>
			)}
			<Controls.Button
				className={cx("icon-remove", classNameIcon)}
				onClick={handleRemove}
			>
				{icons.Button({ className: cx("icon") }).closeNoOutline}
			</Controls.Button>
		</div>
	);
}

export default CardImage;
