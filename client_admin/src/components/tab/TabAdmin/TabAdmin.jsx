import classNames from "classnames/bind";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useReducer } from "react";
import Controls from "~/components/controls";
import Loading from "~/components/Loading";

import { actions, cusReducer } from "~/stores";
import adminConfig from "~/stores/Admins";
import Tabs from "../components/Tabs";
import TabPanel from "../TabPanel";
import tabStyle from "../tabTable.module.scss";
import * as userService from "~/services/userService";
import { useMemo } from "react";
import AdminTable from "~/components/table/AdminTable";
import SearchBar from "~/components/SearchBar";
import { ContactlessOutlined } from "@mui/icons-material";

const tabTableStyles = classNames.bind(tabStyle);
const listStatus = adminConfig.listStatus;
const options = adminConfig.options;

function TabAdmin() {
	const [state, dispatch] = useReducer(
		cusReducer.reducers.TabTableReduce,
		cusReducer.initStates.admins
	);
	const [filter, setFilter] = useState(cusReducer.initStates.filterAdmins);
	const [admins, setAdmins] = useState([]);
	const [isUpdate, setIsUpdate] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [status, setStatus] = useState(null);
	useEffect(() => {
		setIsLoading(true);
		const fetchApi = async () => {
			destroyTippy();
			const result = await userService.getAllAdmin(state);
			if (result) {
				handleAdmins(result);
			}
		};
		setIsLoading(false);
		if (isUpdate) {
			setIsLoading(true);
			fetchApi();
		}
		setIsUpdate(!isUpdate);
	}, [state]);

	const destroyTippy = () => {
		if (admins && admins.length > 0)
			[...document.querySelectorAll("*")].forEach((node) => {
				if (node._tippy) {
					node._tippy.destroy();
				}
			});
	};
	const handleAdmins = (result) => {
		if (result) {
			console.log(result);
			const { status, page, limit, totalPages } = result;
			setStatus({
				all: result.totalDocs,
			});
			dispatch(actions.setNewPropTable({ status, page, limit, totalPages }));
			setAdmins(result.docs);
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
		dispatch(
			actions.setStatusTable({
				indexStatus: optionSelected,
				status: listStatus[optionSelected].key,
			})
		);
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
	console.log(admins);
	const Content = useMemo(() => {
		{
			return listStatus.map((item, index) => {
				return (
					<TabPanel
						key={index}
						value={state.indexStatus}
						index={index}
					>
						<Loading isLoading={isLoading}>
							<AdminTable
								state={state}
								admins={admins}
								onPageChange={handlePageChange}
								onLimitChange={handleLimitChange}
							/>
						</Loading>
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
					<SearchBar
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
			{Content}
		</Tabs>
	);
}

export default TabAdmin;
