import React, { useMemo, useReducer, useState } from "react";

import styles from "./tabCustomer.module.scss";
import tabStyle from "../tabTable.module.scss";
import Tabs from "../components/Tabs";
import { TableProduct } from "~/components/table/product";
import TabPanel from "../TabPanel";
import { useDebounce } from "~/hooks";
import { useEffect } from "react";
import * as productService from "~/services/productsService";
import * as stores from "~/stores";
import * as initState from "~/config/initialStates";
import Loading from "~/components/Loading";
import classNames from "classnames/bind";
import Controls from "~/components/controls";
import Search from "~/components/Search";
import { getCategories, getCategoriesTree } from "~/services/categoriesSerivce";
import { convertToSlug, convertTreeObject } from "~/utils/convertObject";
import CustomerConfig from "~/config/Customer";

const listStatus = CustomerConfig.listStatus;
const options = CustomerConfig.options;
const constant = stores.constants;
const actions = stores.actions;
const initialState = initState.products;
const initFilter = initState.filterProduct;
const tabTableStyles = classNames.bind(tabStyle);
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
		case constant.SET_TYPE_SEARCH_PRODUCTS:
			return {
				...state,
				typeSearch: action.payload,
			};
		case constant.SET_SEARCH_PRODUCTS:
			return {
				...state,
				search: action.payload,
			};
		case constant.SET_CATEGORY_PRODUCTS:
			return {
				...state,
				category: action.payload,
			};
		case constant.SET_FILTER_PRODUCTS:
			return {
				...state,
				category: action.payload.idCategory,
				sort: action.payload.sort,
				typeSearch: action.payload.typeSearch,
				search: action.payload.search,
			};
		case constant.SET_PAGE_PRODUCTS:
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

function TabCustomer() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const [filter, setFilter] = useState(initFilter);
	const [products, setProducts] = useState([]);
	const [isUpdate, setIsUpdate] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [categoriesTree, setCategoriesTree] = useState([]);
	const [categories, setCategories] = useState([]);
	useEffect(() => {
		const fetchApi = async () => {
			destroyTippy();
			const result = await productService.getProducts(state);
			handleProducts(result);
		};
		setIsLoading(false);
		if (isUpdate) {
			setIsLoading(true);
			fetchApi();
		}
		setIsUpdate(!isUpdate);
	}, [state]);

	useEffect(() => {
		const fetchCategoriesTree = async () => {
			const result = await getCategoriesTree();
			if (result) {
				setCategoriesTree(convertTreeObject(result));
			}
		};
		const fetchCategories = async () => {
			const result = await getCategories();
			if (result) {
				setCategories(result.docs);
			}
		};
		fetchCategoriesTree();
		fetchCategories();
	}, []);

	const destroyTippy = () => {
		if (products && products.length > 0)
			[...document.querySelectorAll("*")].forEach((node) => {
				if (node._tippy) {
					node._tippy.destroy();
				}
			});
	};
	const handleProducts = (result) => {
		if (result) {
			const { status, page, limit, totalPages } = result;
			dispatch(actions.setNewPropProducts({ status, page, limit, totalPages }));
			setProducts(result.docs);
		}
	};
	const handleLimitChange = (e) => {
		dispatch(actions.setLimitRow(e.target.value));
	};
	const handlePageChange = (e, optionSelected) => {
		dispatch(actions.setPageProducts(optionSelected));
	};
	const handleTabChange = (e, optionSelected) => {
		dispatch(actions.setStatusProducts({ indexStatus: optionSelected, status: listStatus[optionSelected].key }));
	};
	const handleTypeSearchChange = (e) => {
		filter.typeSearch = e.target.value;
	};
	const handleSearchChange = (value) => {
		setFilter({ ...filter, search: value });
	};
	const handleCategoryChange = (value) => {
		let slug = convertToSlug(value);
		let item = categories.find((item) => item.slug === slug);
		setFilter({ ...filter, category: value, idCategory: item.id });
	};
	const handleSortChange = (e) => {
		setFilter({
			...filter,
			sort: e.target.value,
		});
	};
	const handleConfirm = (e) => {
		e.preventDefault();
		handleFilter();
	};
	const handleFilter = (e) => {
		dispatch(actions.setFilterProducts({ ...filter }));
	};

	const Content = useMemo(() => {
		{
			return listStatus.map((item, index) => {
				return (
					<TabPanel
						key={index}
						value={state.indexStatus}
						index={index}
					>
						{isLoading ? (
							<Loading
								size={25}
								height={500}
							/>
						) : (
							<TableProduct
								categories={categories}
								state={state}
								products={products}
								onPageChange={handlePageChange}
								onLimitChange={handleLimitChange}
							/>
						)}
					</TabPanel>
				);
			});
		}
	}, [isLoading]);
	return (
		<Tabs
			value={state.indexStatus}
			onChange={handleTabChange}
			items={listStatus}
		>
			<div className={tabTableStyles("tool-filter")}>
				<div className={tabTableStyles("top")}>
					<Controls.Select
						size="small"
						labelInside={true}
						label={options.typeSearch.name}
						className={tabTableStyles("type-search")}
						items={options.typeSearch.value}
						onChange={handleTypeSearchChange}
						value={filter.typeSearch}
					/>
					<Search
						className={tabTableStyles("search-box")}
						size="small"
						value={filter.search}
						onChange={handleSearchChange}
					/>
					<Controls.Button
						primary
						onClick={handleConfirm}
						className={tabTableStyles("confirm")}
					>
						Xác nhận
					</Controls.Button>
				</div>

				<div className={tabTableStyles("bottom")}>
					<Controls.Select
						none={true}
						noneLabel="Không"
						size="small"
						labelInside={true}
						label={options.typeSort.name}
						className={tabTableStyles("sort-select")}
						items={options.typeSort.value}
						onChange={handleSortChange}
						value={filter.sort}
					/>
					<Controls.TreeSelect
						className={tabTableStyles("category-select")}
						size={"large"}
						label="Danh mục"
						value={filter.category}
						onChange={handleCategoryChange}
						items={categoriesTree}
					/>
				</div>
			</div>
			{Content}
		</Tabs>
	);
}

export default TabCustomer;
