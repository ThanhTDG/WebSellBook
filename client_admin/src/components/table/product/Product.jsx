import { Paper } from "@mui/material";
import React, { useReducer } from "react";

import Table from "~/components/table/components";
import { table as tableConfig, limitRowsBook as limitRow } from "~/config/table";

import { actions, useProductMgt } from "~/stores";
import Footer from "../Footer";
import { limitRowsBook } from "~/config/table";
import { useEffect } from "react";
import * as constant from "~/stores/constants";
import { useDebounce } from "~/hooks";
import * as productService from "~/services/productsService";
import Loading from "~/components/Loading";
const bookConfig = tableConfig.book;

function Product(props) {
	const { state, products, onLimitChange, onPageChange } = props;
	return (
		<Paper>
			{products && products.length > 0 && (
				<Table.Frame>
					<Table.Head>
						{bookConfig.headers.map((header, index) => (
							<Table.Cell
								key={index}
								align={header.align}
							>
								{header.title}
							</Table.Cell>
						))}
					</Table.Head>
					<Table.Body>
						{products.map((item) => (
							<Table.Rows.Product
								key={item.id}
								product={item}
							/>
						))}
					</Table.Body>
				</Table.Frame>
			)}

			<Footer
				limitValue={state.limit}
				limit={limitRow}
				onLimitChange={onLimitChange}
				pageValue={state.page}
				pageMax={state.totalPages}
				onPageChange={onPageChange}
			/>
		</Paper>
	);
}

export default Product;
