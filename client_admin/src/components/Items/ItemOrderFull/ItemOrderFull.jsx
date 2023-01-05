import classNames from "classnames/bind";
import React from "react";
import { generatePath, Link } from "react-router-dom";

import Image from "~/components/Image";
import Popper from "~/components/Popper";
import { constants } from "~/stores";
import PageConfig from "~/stores/pages";
import { displayMoney } from "~/utils/display";

import styles from "./itemOrderFull.module.scss";

const cx = classNames.bind(styles);
function ItemOrder(props) {
	const {
		product = {
			id: "634ed8e4f6a3a7266d99276d",
			name: "Thiên Sứ Nhà Bên – Tập 3",
			description:
				"“Mọi người đều thân thiết với Amane, chỉ có tôi như bị cho ra rìa vậy đó.” \\nMahiru và Amane đã lên lớp 11, họ trở thành bạn cùng lớp với nhau! Trái với Mahiru luôn cố gắng thu hẹp khoảng cách kể cả khi ở trường, Amane vẫn giữ ý với “thiên sứ” và không tiến thêm một bước nào. \\nNhờ có Chitose mà Mahiru dần xóa bỏ bức tường ngăn cách với các bạn cùng lớp, trong khi Amane lại nhớ đến vết thương cũ vừa lành trong\\nĐây là câu chuyện tình ngọt ngào với cô gái nhà bên tuy lạnh lùng nhưng thật đáng yêu đã được ủng hộ nhiệt tình trên trang Shousetsuka ni Narou.\\n* THIÊN SỨ NHÀ BÊN được xem là cú hit của dòng Light Novel rom-com tại thị trường Nhật Bản, với nội dung hài hước - lãng mạn rất được yêu thích. Tác phẩm nằm top 10 Kono Light novel ga Sugoi năm 2021, đã bán ra hơn 400.000 bản chỉ với 4 tập truyện riêng tại Nhật Bản.\\nSố tập: 5+ (on-going)\\nThiên Sứ Nhà Bên – Tập 3 – Phiên bản tặng kèm Bookmark\\n---Một ấn phẩm của WINGS BOOKS - Thương hiệu sách trẻ của NXB Kim Đồng.Giá sản phẩm trên ToiMuaSach đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như phí vận chuyển, phụ phí hàng cồng kềnh, thuế nhập khẩu (đối với đơn hàng giao từ nước ngoài có giá trị trên 1 triệu đồng).....\n",
			slug: "thien-su-nha-ben-tap-3",
			authors: "Saekisan, Hanekoto",
			translators: "Trân Trân",
			sku: "8935244872972",
			isbn13: "978-0134494166",
			isbn10: "3033204",
			supplier: "Nhà Xuất Bản Kim Đồng",
			publisher: "NXB Kim Đồng",
			publisherDate: "2022-04-30",
			images: [
				"https://salt.tikicdn.com/ts/product/01/93/08/61e928ce145c06a11a483ed49d826da2.jpg",
			],
			weight: 350,
			height: 19,
			width: 13,
			page: 316,
			bookCover: "Bìa mềm",
			status: "available",
			expectedDate: "2022-04-30",
			countInStock: 100,
			sold: 10,
			originalPrice: 95000,
			discountRate: 25,
			price: 72000,
			category: {
				_id: "634d8da516d1688abe54d4ef",
				name: "Light novel",
			},
		},
	} = props;
	return (
		<div className={cx("wrapper")}>
			<div className={cx("image-bg")}>
				<Image
					className={cx("image")}
					src={product.images ? product.images[0] : ""}
				/>
			</div>
			<div className={cx("info")}>
				<Popper.ProductDetail
					id={product.id}
					placement={"top-start"}
				>
					<Link
						to={generatePath(PageConfig.product.route, {
							id: product.id,
						})}
						target="_blank"
					>
						<div className={cx("name", "single-line")}>{product.name}</div>
					</Link>
				</Popper.ProductDetail>
				<div className={cx("wrapper-price", "single-line")}>
					<div className={cx("title-price")}>{`${constants.PRICE}:`}</div>
					<div className={cx("value-price")}>{displayMoney(product.price)}</div>
				</div>
				<div className={cx("wrapper-amount", "single-line")}>
					<div className={cx("title-amount")}>{`${constants.AMOUNT}:`}</div>
					<div className={cx("value-amount")}>
						{`x${product.amount ? product.amount : 2}`}
					</div>
				</div>
				<div className={cx("wrapper-all-pay", "single-line")}>
					<div className={cx("title-all-pay")}>{`${constants.ALL_PAY}:`}</div>
					<div className={cx("value-all-pay")}>
						{displayMoney(product.price * 2)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default ItemOrder;
