import { Carousel } from "antd";
import classNames from "classnames/bind";
import React from "react";
import images from "~/assets/images";
import Image from "../Image";

import styles from "./banner.module.scss";
const cx = classNames.bind(styles);
function Banner(props) {
	const { src = images.banners, autoplay = true } = props;
	console.log(src);
	return (
		<div className={cx("wrapper")}>
			<Carousel
				autoplay
				className={cx("slider")}
			>
				{src.map((image, index) => {
					return (
						<Image
							className={cx("image-banner")}
							src={src[0]}
							key={index}
							alt={"banner" + index}
						/>
					);
				})}
			</Carousel>
		</div>
	);
}

export default Banner;
