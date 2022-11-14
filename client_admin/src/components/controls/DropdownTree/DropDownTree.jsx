import React, { useEffect, useState } from "react";
import TreeSelect, { FreeSoloNode, DefaultOption, getDefaultOptionProps } from "mui-tree-select";
import {
	Box,
	CssBaseline,
	FormControl,
	FormControlLabel,
	FormHelperText,
	Switch,
	TextField,
	useMediaQuery,
} from "@mui/material";
import sampleData from "./sampleData";
import { convertToTree } from "~/utils/util";
const syncOrAsync = function (value, returnAsync) {
	if (returnAsync) {
		return new Promise((resolve) => setTimeout(() => resolve(value), Math.random() * 500));
	}
	return value;
};

class Node {
	constructor(value, parent = null, children = null) {
		this.value = {
			id: value.id,
			name: value.name,
			slug: value.slug,
		};
		this.parent = parent;
		this.children = children;
	}
	getParent() {
		return this.parent;
	}
	getChildren() {
		return this.children;
	}
	isBranch() {
		return this.children ? true : false;
	}
	isEqual(to) {
		return to.value.id === this.value.id;
	}
	toString() {
		return this.value.name;
	}
}
function convertTree(data) {
	const createTree = (parent, data) => {
		let children = data.children;
		if (children && children.length != 0) {
			let listChildNode = [];
			children.forEach((element) => {
				let node = new Node(element, parent);
				createTree(node, element);
				listChildNode.push(node);
			});
			parent.children = listChildNode;
		}
	};
	let tree = [];
	data.map((item) => {
		let nodeRoot = new Node(item);
		createTree(nodeRoot, item);
		tree.push(nodeRoot);
	});
	return tree;
}

function DropdownTree(props) {
	const { name, label, onChange, items } = props;
	let tree = convertTree(items);
	const [runAsync, setRynAsync] = useState(false);
	return (
		<div>
			<TreeSelect
				getChildren={(node) => {
					return syncOrAsync(node ? node.getChildren() : tree.map((item) => item), runAsync);
				}}
				getParent={(node) => syncOrAsync(node.getParent(), runAsync)}
				isBranch={(node) => {
					return syncOrAsync(node.isBranch(), runAsync);
				}}
				isOptionEqualToValue={(option, value) => {
					if (option instanceof FreeSoloNode) {
						return false;
					} else {
						return option.isEqual(value);
					}
				}}
				onChange={(e, node) => onChange(e, node)}
				renderInput={(params) => {
					return <TextField {...params} label={label} helperText="Select a city by its country and state." />;
				}}
				sx={{ m: 1, mt: 2, mb: 2 }}
			/>
		</div>
	);
}

export default DropdownTree;
