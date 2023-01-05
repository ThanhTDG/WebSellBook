import * as React from "react";
import TreeViewMui from "@mui/lab/TreeView";
import TreeItem, { treeItemClasses } from "@mui/lab/TreeItem";
import Collapse from "@mui/material/Collapse";
import classNames from "classnames/bind";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "./treeView.scss";
import styles from "./treeView.module.scss";

const cx = classNames.bind(styles);
const getTreeItemsFromData = (treeItems, maxLevel, idVisible = []) => {
	return treeItems.map((treeItemData) => {
		let children = undefined;
		if (treeItemData.children && treeItemData.children.length > 0) {
			children = getTreeItemsFromData(treeItemData.children, maxLevel);
		}
		if (treeItemData.level <= maxLevel && !idVisible.find((item) => treeItemData.id === item.id))
			return (
				<TreeItem
					className={cx("tree-item")}
					key={treeItemData.id}
					nodeId={treeItemData.id}
					label={treeItemData.name}
					children={children}
				/>
			);
	});
};

function TreeView(props) {
	const { treeItems, idSelect, onChange, expanded, className, idVisible, handleToggle, maxLevel, ...passProp } = props;
	const handleNodeChange = (e, NID) => {
		onChange(NID);
	};
	console.log(maxLevel);
	return (
		<TreeViewMui
			className={className}
			aria-label="treeView"
			selected={idSelect}
			expanded={expanded}
			onNodeSelect={handleNodeChange}
			onNodeToggle={handleToggle}
			defaultCollapseIcon={<ExpandMoreIcon />}
			defaultExpandIcon={<ChevronRightIcon />}
			{...passProp}
		>
			{getTreeItemsFromData(treeItems, maxLevel, idVisible)}
		</TreeViewMui>
	);
}

export default TreeView;
