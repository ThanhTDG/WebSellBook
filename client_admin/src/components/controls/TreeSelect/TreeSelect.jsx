import React from "react";
import { TreeSelect as TreeSelectAntd } from "antd";
import classNames from "classnames/bind";

import styles from "./treeSelect.module.scss";

const cx = classNames.bind(styles);
const treeData = [
	{
		value: "parent 1",
		title: "parent 1",
		children: [
			{
				value: "parent 1-0",
				title: "parent 1-0",
				children: [
					{
						value: "leaf1",
						title: "leaf1",
					},
					{
						value: "leaf2",
						title: "leaf2",
					},
				],
			},
			{
				value: "parent 1-1",
				title: "parent 1-1",
				children: [
					{
						value: "leaf3",
						title: (
							<b
								style={{
									color: "#08c",
								}}
							>
								leaf3
							</b>
						),
					},
				],
			},
		],
	},
];
function TreeSelect(props) {
	const {
		className = null,
		ExpandAll = false,
		value,
		onChange,
		placeholder,
		size = "middle",
		maxHeight = 400,
		items = treeData,
	} = props;
	return (
		<div className={cx("wrapper", className)}>
			<TreeSelectAntd
				showSearch
				style={{
					width: "100%",
				}}
				value={value}
				dropdownStyle={{
					maxHeight: { maxHeight },
					overflow: "auto",
				}}
				size={size}
				placeholder={placeholder}
				allowClear
				treeDefaultExpandAll={ExpandAll}
				onChange={onChange}
				treeData={items}
			/>
		</div>
	);
}

export default TreeSelect;
