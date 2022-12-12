import React, { useMemo, useReducer, useState } from "react";

import styles from "./tabCustomer.module.scss";
import tabStyle from "../tabTable.module.scss";
import Tabs from "../components/Tabs";
import { TableProduct } from "~/components/table/product";
import TabPanel from "../TabPanel";
import { useDebounce } from "~/hooks";
import { useEffect } from "react";
import * as customerService from "~/services/customerService";
import * as stores from "~/stores";
import * as initState from "~/stores/initStates";
import Loading from "~/components/Loading";
import classNames from "classnames/bind";
import Controls from "~/components/controls";
import Search from "~/components/Search";
import CustomerConfig from "~/stores/Customer";
import CustomerTable from "~/components/table/CustomerTable";
import fakeCustomer from "./fakeCustomers";
import { TabTableReduce } from "~/stores/Reducer";

const listStatus = CustomerConfig.listStatus;
const options = CustomerConfig.options;
const constant = stores.constants;
const actions = stores.actions;
const initialState = initState.customer;
const initFilter = initState.filterProduct;
const tabTableStyles = classNames.bind(tabStyle);

function TabCustomer() {
	const [state, dispatch] = useReducer(TabTableReduce, initialState);
	const [filter, setFilter] = useState(initFilter);
	const [customers, setCustomers] = useState([]);
	const [isUpdate, setIsUpdate] = useState(true);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const fetchApi = async () => {
			destroyTippy();

			// const result = await customerService.getCustomers(state);
			// handleCustomers(result);
		};

		if (isUpdate) {
			setIsLoading(true);
			//fetchApi();
		}

		setCustomers(fakeCustomer);
		setIsLoading(false);
		return;
		setIsUpdate(!isUpdate);
	}, [state]);

	const destroyTippy = () => {
		if (customers && customers.length > 0)
			[...document.querySelectorAll("*")].forEach((node) => {
				if (node._tippy) {
					node._tippy.destroy();
				}
			});
	};
	const handleCustomers = (result) => {
		if (result) {
			const { status, page, limit, totalPages } = result;
			dispatch(actions.setNewPropTable({ status, page, limit, totalPages }));
			setCustomers(result.docs);
		} else {
			setCustomers(fakeCustomer);
			setIsLoading(false);
		}
	};
	const handleLimitChange = (e) => {
		dispatch(actions.setLimitRow(e.target.value));
	};
	const handlePageChange = (e, optionSelected) => {
		dispatch(actions.setPageTable(optionSelected));
	};
	const handleTabChange = (e, optionSelected) => {
		dispatch(actions.setStatusTable({ indexStatus: optionSelected, status: listStatus[optionSelected].key }));
	};
	const handleTypeSearchChange = (e) => {
		filter.typeSearch = e.target.value;
	};
	const handleSearchChange = (value) => {
		setFilter({ ...filter, search: value });
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
		dispatch(actions.setFilterTable({ ...filter }));
	};

	// const Content = useMemo(() => {
	// 	{
	// 		return listStatus.map((item, index) => {
	// 			return (
	// 				<TabPanel
	// 					key={index}
	// 					value={state.indexStatus}
	// 					index={index}
	// 				>
	// 					{isLoading ? (
	// 						<Loading
	// 							size={25}
	// 							height={500}
	// 						/>
	// 					) : (
	// 						<CustomerTable
	// 							state={state}
	// 							customers={customers}
	// 							onPageChange={handlePageChange}
	// 							onLimitChange={handleLimitChange}
	// 						/>
	// 					)}
	// 				</TabPanel>
	// 			);
	// 		});
	// 	}
	// }, [isLoading]);

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
				</div>
			</div>
			{/* {Content} */}
			{listStatus.map((item, index) => {
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
							<CustomerTable
								state={state}
								customers={customers}
								onPageChange={handlePageChange}
								onLimitChange={handleLimitChange}
							/>
						)}
					</TabPanel>
				);
			})}
		</Tabs>
	);
}

export default TabCustomer;
