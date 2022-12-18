import { Paper } from "@mui/material";
import classNames from "classnames/bind";
import React, { useState, Fragment } from "react";
import { generatePath, Link } from "react-router-dom";
import Controls from "~/components/controls";
import Popper from "~/components/Popper";
import Table from "~/components/table/components";
import { status as bookStatus } from "~/stores/Book/bookStatus";
import * as tableConfig from "~/stores/ComponentConfigs/table";
import PageConfig from "~/stores/pages";
import Footer from "../Footer";
import styles from "./tableProduct.scss.module.scss";
const configHeader = tableConfig.table.book;
const cx = classNames.bind(styles);
function ProductTable(props) {
	const { state, products, categories, onLimitChange, onPageChange } = props;
	return (
		<Paper>
			{products && products.length > 0 && (
				<Table.Frame style={{ maxHeight: 700 }}>
					<Table.Head>
						<Table.Cell
							size={"normal"}
							isLast={false}
							align={configHeader.name.align}
						>
							<div className={cx("header", "name")}>{configHeader.name.title}</div>
						</Table.Cell>
						<Table.Cell
							size={"normal"}
							align={configHeader.sold.align}
						>
							<div className={cx("header", "sold")}>{configHeader.sold.title}</div>
						</Table.Cell>
						<Table.Cell
							size={"normal"}
							align={configHeader.countInStock.align}
						>
							<div className={cx("header", "countInStock")}>{configHeader.countInStock.title}</div>
						</Table.Cell>
						<Table.Cell
							size={"normal"}
							align={configHeader.price.align}
						>
							<div className={cx("header", "price")}>{configHeader.price.title}</div>
						</Table.Cell>
						<Table.Cell
							size={"normal"}
							align={configHeader.status.align}
						>
							<div className={cx("header", "status")}>{configHeader.status.title}</div>
						</Table.Cell>
					</Table.Head>
					<Table.Body>
						{products.map((item) => (
							<RowProduct
								key={item.id}
								product={item}
							/>
						))}
					</Table.Body>
				</Table.Frame>
			)}
			<Footer
				limitValue={state.limit}
				limit={tableConfig.limitRow}
				onLimitChange={onLimitChange}
				pageValue={state.page}
				pageMax={state.totalPages}
				onPageChange={onPageChange}
			/>
		</Paper>
	);
}

function RowProduct(props) {
	const { product } = props;
	const [isHovering, setIsHovering] = useState(false);
	const [isEnable, setIsEnable] = useState(product.status !== bookStatus.disable);
	const handleMouseOut = () => {
		setIsHovering(false);
	};
	const handleMouseOver = () => {
		setIsHovering(true);
	};

	const handleSwitchStatus = () => {
		setIsEnable(!isEnable);
	};
	let price = (product.originalPrice * (100 - product.discountRate)) / 100;
	return (
		<Fragment>
			<Table.Row>
				<Table.Cell
					isLast={false}
					align="left"
					onMouseOver={handleMouseOver}
					onMouseOut={handleMouseOut}
				>
					<Popper.DetailProduct
						product={product}
						visible={isHovering}
					>
						<div className={cx("row-table", "name")}>
							<Link
								to={generatePath(PageConfig.product.route, {
									id: product.id,
								})}
								target="_blank"
							>
								<div className={"single-line"}>{product.name}</div>
							</Link>
						</div>
					</Popper.DetailProduct>
				</Table.Cell>
				<Table.Cell>
					<div className={cx("row-table", "sold")}>{product.sold}</div>
				</Table.Cell>
				<Table.Cell>
					<div className={cx("row-table", "countInStock")}>{product.countInStock}</div>
				</Table.Cell>
				<Table.Cell>
					<div className={cx("row-table", "price")}>{product.price}</div>
				</Table.Cell>
				<Table.Cell align="right">
					<div className={cx("row-table", "status")}>
						<Controls.Switch
							checked={isEnable}
							onChange={handleSwitchStatus}
						/>
					</div>
				</Table.Cell>
			</Table.Row>
		</Fragment>
	);
}

export default ProductTable;
