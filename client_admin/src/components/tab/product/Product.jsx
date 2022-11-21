import React, { useReducer, useState } from "react";

import styles from "./product.module.scss";
import Tabs from "../components/Tabs";
import BookConfig from "~/config/Book";
import { TableProduct } from "~/components/table/Product";
import TabPanel from "../TabPanel";
import { limitRowsBook } from "~/config/table";
import { useDebounce } from "~/hooks";
import { useEffect } from "react";
import * as productService from "~/services/productsService";
import * as convertObject from "~/utils/convertObject";
import * as stores from "~/stores";
import * as initState from "~/config/initialStates";

const listStatus = BookConfig.listStatus;
const constant = stores.constants;
const actions = stores.actions;
const initialState = initState.products;

function reducer(state, action) {
	switch (action.type) {
		case constant.SET_LIMIT_ROWS:
			return {
				...state,
				page: 1,
				limit: action.payload,
			};
		case constant.SET_STATUS_PRODUCTS:
			return {
				...initialState,
				indexStatus: action.payload.indexStatus,
				status: action.payload.status,
			};
		case constant.SET_PAGE_PRODUCTS:
			console.log("set Page", state, state.page);
			return {
				...state,
				page: action.payload,
			};
		case constant.SET_NEW_PROP_PRODUCTS:
			return {
				...state,
				status: action.payload.status,
				page: action.payload.page,
				limit: action.payload.limit,
				totalPages: action.payload.totalPages,
			};
		default:
			throw new Error("valid action");
	}
}

function Product() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const debounceValue = useDebounce(state, 500);
	const [products, setProducts] = useState([]);
	const [isUpdate, setIsUpdate] = useState(false);
	const [counter, setCounter] = useState(0);
	useEffect(() => {
		const fetchApi = async () => {
			const result = await productService.getProducts(state);
			console.log(result);
			handleProducts(result);
		};

		if (isUpdate) {
			console.log("update", "isUpdate", state, isUpdate);
			fetchApi();
		}
		setIsUpdate(!isUpdate);
	}, [debounceValue]);

	const handleProducts = (result) => {
		if (result) {
			const { status, page, limit, totalPages } = result;
			dispatch(actions.setNewPropProducts({ status, page, limit, totalPages }));
			setProducts(result.docs);
		}
	};
	console.log(state);
	const handleLimitChange = (e) => {
		dispatch(actions.setLimitRow(e.target.value));
	};
	const handlePageChange = (e, optionSelected) => {
		dispatch(actions.setPageProducts(optionSelected));
	};
	const handleTabChange = (e, optionSelected) => {
		dispatch(actions.setStatusProducts({ indexStatus: optionSelected, status: listStatus[optionSelected].key }));
	};
	return (
		<Tabs
			value={state.indexStatus}
			onChange={handleTabChange}
			items={listStatus}
		>
			{listStatus.map((item, index) => {
				return (
					<TabPanel
						value={state.indexStatus}
						index={index}
					>
						<TableProduct
							state={state}
							products={products}
							onPageChange={handlePageChange}
							onLimitChange={handleLimitChange}
						/>
					</TabPanel>
				);
			})}
		</Tabs>
	);
}

export default Product;
