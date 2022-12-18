import classNames from "classnames/bind";
import React, { useEffect, useState } from "react";
import Loading from "~/components/Loading";

import SearchBar from "~/components/SearchBar";
import TreeView from "~/components/TreeView";
import useDebounce from "~/hooks/useDebounce";
import { convertToSearch, convertToSlug } from "~/utils/convertObject";
import { copyObject } from "~/utils/util";

import styles from "./categoriesTab.module.scss";

const cx = classNames.bind(styles);
function CategoriesTab(props) {
	const { treeCategories, idSelect, onChange, fullScreen = false, className, ...passProps } = props;
	const [expanded, setExpanded] = useState([]);
	const [searchCategory, setSearch] = useState([]);
	const [categories, setCategories] = useState(treeCategories);
	const [isLoading, setIsLoading] = useState(false);
	const [term, setTerm] = useState("");
	const debounce = useDebounce(term, 750);
	const handleToggle = (event, nodeIds) => {
		setExpanded(nodeIds);
	};
	useEffect(() => {
		const arraySearch = copyObject(treeCategories);
		removeVietnamese(arraySearch);
		setSearch(arraySearch);
	}, []);
	useEffect(() => {
		if (term) {
			const [result, listExpand] = search(debounce, searchCategory);
			setExpanded(listExpand);
			setCategories(result);
		} else {
			setCategories(treeCategories);
		}
		setIsLoading(false);
	}, [debounce]);
	useEffect(() => {
		if (term !== debounce) {
			if (!isLoading) {
				setIsLoading(true);
			}
			return;
		}
		if (!term) {
			setIsLoading(false);
		}
	}, [term]);
	return (
		<div className={cx("wrapper", className)}>
			<SearchBar
				className={cx("search-bar")}
				size="small"
				value={term}
				onChange={setTerm}
			/>
			<Loading
				isLoading={isLoading}
				className={cx("loading", fullScreen ? "full-screen" : "")}
			>
				<TreeView
					treeItems={categories}
					idSelect={idSelect}
					onChange={onChange}
					expanded={expanded}
					handleToggle={handleToggle}
					{...passProps}
				></TreeView>
			</Loading>
		</div>
	);
}

function dfs(node, term, foundIDS, listID) {
	let isMatching = node.slug && node.slug.indexOf(term) > -1;

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
function removeVietnamese(array) {
	array.forEach((item) => {
		dfsRemoveVietnamese(item);
	});
}
function dfsRemoveVietnamese(node) {
	node = {
		...node,
		name: convertToSearch(node.name),
	};
	if (Array.isArray(node.children)) {
		node.children.forEach((child) => {
			dfsRemoveVietnamese(child);
		});
	}
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
	term = convertToSlug(term);
	const dataNode = {
		children: data,
	};
	const matchedIDS = [];
	const listID = [];
	dfs(dataNode, term, matchedIDS, listID);
	return [filter(data, matchedIDS), listID];
}

export default CategoriesTab;
