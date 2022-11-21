import React from "react";
import classNames from "classnames/bind";

import styles from "./content.module.scss";
import Image from "~/components/Image";
import images from "~/assets/images";
import Controls from "~/components/controls";
import { border } from "@mui/system";

const cx = classNames.bind(styles);
function Content(props) {
	const { product } = props;
	let shortDesc = product.description.substring(0, 150);
	return (
		<div className={cx("wrapper")}>
			<div className={cx("illustration")}>
				<Image
					className={cx("illustration-img")}
					src={product.images[0]}
				></Image>
			</div>
			<div className={cx("info")}>
				<div className={cx("name")}>
					<h3 className={cx("text")}>{product.name}</h3>
				</div>
				<div className={cx("category")}>
					<div className={cx("title")}>{product.category}</div>
				</div>
				<div className={cx("rating")}>
					<div className={cx("rating-value")}>
						<div className={cx("title")}>Đánh giá:</div>
						<div className={cx("value")}>{product.rating ? product.rating : "-"}</div>
						<Image
							className={cx("rating-img")}
							src={images.star}
							alt="rating"
						/>
					</div>
					<div className={cx("reviews")}>
						<div className={cx("title")}>Số lượng:</div>
						<div className={cx("reviews-value")}>{product.numOfReviews ? product.numOfReviews : "-"}</div>
					</div>
				</div>

				<div className={cx("short-desc")}>
					<div className="title">Mô tả</div>
					<div className={cx("content")}>
						<Controls.Textarea
							disable={true}
							max
							style={{ outline: "none", border: "none", padding: 0, overflow: "hidden" }}
							maxRows={6}
							value={`${shortDesc}`}
						></Controls.Textarea>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Content;
