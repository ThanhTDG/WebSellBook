import React, { Fragment, useState } from "react";
import { generatePath, Link } from "react-router-dom";
import TableComp from "~/components/table/components";
import BookConfig from "~/config/Book";
import classNames from "classnames/bind";

import styles from "./Product.module.scss";
import PageConfig from "~/config/pages";
import Popper, { PopperWrapper } from "~/components/Popper";
import Controls from "~/components/controls";

const cx = classNames.bind(styles);
const status = BookConfig.status;

function Product(props) {
	const { product } = props;
	const [isHovering, setIsHovering] = useState(false);
	const [isEnable, setIsEnable] = useState(product.status !== status.disable);
	const handleMouseOut = () => {
		setIsHovering(false);
	};
	const handleMouseOver = () => {
		setIsHovering(true);
	};

	const handleSwitchStatus = () => {
		setIsEnable(!isEnable);
	};
	let linkProduct = PageConfig.product.route + product.id;
	let price = (product.originalPrice * (100 - product.discountRate)) / 100;
	return (
		<Fragment>
			<TableComp.Row>
				<TableComp.Cell
					size="small"
					align="left"
					onMouseOver={handleMouseOver}
					onMouseOut={handleMouseOut}
					width={700}
				>
					<Popper.DetailProduct
						product={product}
						visible={isHovering}
					>
						<Link
							to={generatePath(PageConfig.product.route, {
								id: product.id,
							})}
							target="_blank"
						>
							<div className={cx("single-line")}>{product.name}</div>
						</Link>
					</Popper.DetailProduct>
				</TableComp.Cell>
				<TableComp.Cell size="small">{product.countInStock}</TableComp.Cell>
				<TableComp.Cell size="small">{product.sold}</TableComp.Cell>
				<TableComp.Cell size="small">{product.price.toLocaleString()}</TableComp.Cell>
				<TableComp.Cell size="small">
					<Controls.Switch
						checked={isEnable}
						onChange={handleSwitchStatus}
					/>
				</TableComp.Cell>
			</TableComp.Row>
		</Fragment>
	);
}

export default Product;
