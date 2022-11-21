import React, { Fragment, useState } from "react";
import { generatePath, Link } from "react-router-dom";
import TableComp from "~/components/table/components";
import { Switch } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { green } from "@mui/material/colors";
import BookConfig from "~/config/Book";
import classNames from "classnames/bind";

import styles from "./Product.module.scss";
import PageConfig from "~/config/pages";
import Popper, { PopperWrapper } from "~/components/Popper";
import Tippy from "@tippyjs/react/headless";
import Controls from "~/components/controls";

const cx = classNames.bind(styles);
const status = BookConfig.status;

const GreenSwitch = styled(Switch)(({ theme }) => ({
	"& .MuiSwitch-switchBase.Mui-checked": {
		color: green[600],
		"&:hover": {
			backgroundColor: alpha(green[600], theme.palette.action.hoverOpacity),
		},
	},
	"& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
		backgroundColor: green[600],
	},
}));

function Product(props) {
	const { product } = props;
	const [isHovering, setIsHovering] = useState(false);
	const [isEnable, setIsEnable] = useState(product.status !== status.disable);
	const handleMouseOut = () => {
		setIsHovering(false);
	};
	const handleMouseOver = () => {
		console.log("isHover");
		setIsHovering(true);
	};

	const handleSwitchStatus = () => {
		setIsEnable(!isEnable);
	};
	let linkProduct = PageConfig.product.route + product.id;
	let price = product.originalPrice * (100 - product.discountRate);
	return (
		<Fragment>
			<TableComp.Row>
				<TableComp.Cell
					size="small"
					align="left"
					onMouseOver={handleMouseOver}
					onMouseOut={handleMouseOut}
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
							{product.name}
						</Link>
					</Popper.DetailProduct>
				</TableComp.Cell>
				<TableComp.Cell size="small">{product.countInStock}</TableComp.Cell>
				<TableComp.Cell size="small">{price}</TableComp.Cell>
				<TableComp.Cell size="small">{product.sold}</TableComp.Cell>
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
