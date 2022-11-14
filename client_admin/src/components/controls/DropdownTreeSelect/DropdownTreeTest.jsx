import React from "react";
import DropdownTreeSelect from "react-dropdown-tree-select";
import { OutlinedBox } from "~/components/OutLinedBox/Outlinebox";
import "./dropdownTree.scss";
/// https://www.npmjs.com/package/react-dropdown-tree-select#styling-and-customization
function DropdownTree({ name, label, value, data, handleChange, onBlur, mode }) {
	const onChange = (currentNode, selectedNodes) => {
		console.log("onChange::", currentNode, selectedNodes);
	};
	const onAction = (node, action) => {
		console.log("onAction::", action, node);
	};
	const onNodeToggle = (currentNode) => {
		console.log("onNodeToggle::", currentNode);
	};
	return (
		<OutlinedBox title={label}>
			<DropdownTreeSelect
				data={data}
				onChange={onChange}
				onAction={onAction}
				onNodeToggle={onNodeToggle}
				mode={mode}
			/>
		</OutlinedBox>
	);
}

export default DropdownTree;
