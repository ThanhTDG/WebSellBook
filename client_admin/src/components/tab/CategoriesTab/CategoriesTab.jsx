import classNames from "classnames/bind";
import React, { useEffect, useMemo, useState } from "react";
import { icons } from "~/assets/images";
import Controls from "~/components/controls";
import CreateCategory from "~/components/Dialog/CreateCategory";
import Loading from "~/components/Loading";

import SearchBar from "~/components/SearchBar";
import TreeView from "~/components/TreeView";
import useDebounce from "~/hooks/useDebounce";
import { constants } from "~/stores";
import { convertToSearch, convertToSlug } from "~/utils/convertObject";
import { copyObject } from "~/utils/util";

import styles from "./categoriesTab.module.scss";

const cx = classNames.bind(styles);
function CategoriesTab(props) {
	const {
		tree,
		idSelect,
		list,
		idVisible = [],
		maxLevel = constants.MAX_LEVEL,
		onChange,
		fullScreen = false,
		className,
		CreateCategory,
		...passProps
	} = props;
	const [expanded, setExpanded] = useState([]);
	const [categories, setCategories] = useState(tree);
	const [isLoading, setIsLoading] = useState(false);
	const [term, setTerm] = useState("");
	const debounce = useDebounce(term, 750);
	const handleToggle = (event, nodeIds) => {
		setExpanded(nodeIds);
	};

	useEffect(() => {
		if (term !== debounce) {
			setIsLoading(true);
			return;
		}
		if (debounce) {
			const [result, listExpand] = search(debounce, tree);
			setExpanded(listExpand);
			setCategories(result);
		} else {
			setCategories(tree);
		}
		setIsLoading(false);
	}, [debounce, term]);

	const controlTree = () => {
		if (expanded.length > 0) {
			setExpanded([]);
		}
	};
	const treeView = useMemo(
		() => (
			<Loading
				isLoading={isLoading}
				className={cx("loading", fullScreen ? "full-screen" : "")}
			>
				<div className={cx(className)}>
					<TreeView
						maxLevel={maxLevel}
						treeItems={categories}
						idSelect={idSelect}
						idVisible={idVisible}
						onChange={onChange}
						expanded={expanded}
						handleToggle={handleToggle}
						{...passProps}
					></TreeView>
				</div>
			</Loading>
		),
		[expanded, isLoading, idSelect, list, tree]
	);
	return (
		<div className={cx("wrapper")}>
			{CreateCategory && <div className={cx("add-category")}>{CreateCategory}</div>}
			<div className={cx("future")}>
				<SearchBar
					className={cx("search-bar")}
					size="small"
					value={term}
					onChange={setTerm}
				/>
				{
					<Controls.Button
						primary
						className={cx("btn-control-tree")}
						onClick={controlTree}
						disable={!(categories.length > 0 && expanded.length > 0 && !term)}
					>
						{icons.Button("").unless}
					</Controls.Button>
				}
			</div>
			{treeView}
		</div>
	);
}

function dfs(node, term, foundIDS, listID) {
	let isMatching = node.name && node.name.toLowerCase().indexOf(term) > -1;
	if (Array.isArray(node.children)) {
		listID.push(node.id);
		node.children.forEach((child) => {
			const hasMatchingChild = dfs(child, term, foundIDS, listID);
			isMatching = isMatching || hasMatchingChild;
		});
	}
	if (isMatching && node.id) {
		foundIDS.push(node.id);
	}

	return isMatching;
}

function filter(data, matchedIDS) {
	return data
		.filter((item) => matchedIDS.indexOf(item.id) > -1)
		.map((item) => ({
			...item,
			children: item.children ? filter(item.children, matchedIDS) : [],
		}));
}

function search(term, data) {
	term = term.toLowerCase().trim();
	console.log(term);
	const dataNode = {
		children: data,
	};
	const matchedIDS = [];
	const listID = [];
	dfs(dataNode, term, matchedIDS, listID);
	return [filter(data, matchedIDS), listID];
}

export default CategoriesTab;
