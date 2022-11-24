import { Paper } from "@mui/material";
import React, { useReducer, memo } from "react";

import Table from "~/components/table/components";
import { table as tableConfig, limitRow } from "~/stores/table";

import { actions, useProductMgt } from "~/stores";
import Footer from "../Footer";
import { useEffect } from "react";
import * as constant from "~/stores/constants";
import { useDebounce } from "~/hooks";
import * as productService from "~/services/productService";
import Loading from "~/components/Loading";
const bookConfig = tableConfig.book;

function Product(props) {
	const { state, products, categories, onLimitChange, onPageChange } = props;
	console.log("rerender", props);
	return (
		<Paper>
			{products && products.length > 0 && (
				<Table.Frame style={{ maxHeight: 700 }}>
					<Table.Head>
						<Table.Cell align={bookConfig.headers[0].align}>{bookConfig.headers[0].title}</Table.Cell>
						<Table.Cell align={bookConfig.headers[1].align}>{bookConfig.headers[1].title}</Table.Cell>
						<Table.Cell align={bookConfig.headers[2].align}>{bookConfig.headers[2].title}</Table.Cell>
						<Table.Cell align={bookConfig.headers[3].align}>{bookConfig.headers[3].title}</Table.Cell>
						<Table.Cell align={bookConfig.headers[4].align}>{bookConfig.headers[4].title}</Table.Cell>
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
