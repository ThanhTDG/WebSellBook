import { Paper } from "@mui/material";
import React, { useState, Fragment } from "react";
import { generatePath, Link } from "react-router-dom";
import Controls from "~/components/controls";
import Popper from "~/components/Popper";
import Table from "~/components/table/components";
import { status as bookStatus } from "~/stores/Book/bookStatus";
import * as tableConfig from "~/stores/ComponentConfigs/table";
import PageConfig from "~/stores/pages";
import Footer from "../Footer";

const configHeader = tableConfig.table.book;

function ProductTable(props) {
	const { state, products, categories, onLimitChange, onPageChange } = props;
	return (
		<Paper>
			{products && products.length > 0 && (
				<Table.Frame style={{ maxHeight: 700 }}>
					<Table.Head>
						<Table.Cell align={configHeader.name.align}>{configHeader.name.title}</Table.Cell>
						<Table.Cell align={configHeader.sold.align}>{configHeader.sold.title}</Table.Cell>
						<Table.Cell align={configHeader.countOfStock.align}>{configHeader.countOfStock.title}</Table.Cell>
						<Table.Cell align={configHeader.price.align}>{configHeader.price.title}</Table.Cell>
						<Table.Cell align={configHeader.status.align}>{configHeader.status.title}</Table.Cell>
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
							<div className={"single-line"}>{product.name}</div>
						</Link>
					</Popper.DetailProduct>
				</Table.Cell>
				<Table.Cell size="small">{product.countInStock}</Table.Cell>
				<Table.Cell size="small">{product.sold}</Table.Cell>
				<Table.Cell size="small">{product.price.toLocaleString()}</Table.Cell>
				<Table.Cell size="small">
					<Controls.Switch
						checked={isEnable}
						onChange={handleSwitchStatus}
					/>
				</Table.Cell>
			</Table.Row>
		</Fragment>
	);
}

export default ProductTable;
