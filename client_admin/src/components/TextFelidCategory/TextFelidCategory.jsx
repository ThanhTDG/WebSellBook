import { IconButton } from "@mui/material";
import classNames from "classnames/bind";
import React from "react";
import { icons } from "~/assets/images";
import { constants } from "~/stores";
import Controls from "../controls";
import PickCategory from "../Dialog/PickCategory";

import styles from "./textFelidCategory.module.scss";

const cx = classNames.bind(styles);
function TextFelidCategory(props) {
	const {
		size = "normal",
		label = "Danh mục",
		category,
		setCategory,
		list,
		tree,
		disabled,
		levelDisplay = constants.MAX_LEVEL,
	} = props;

	const clearCategory = () => {
		setCategory({
			...category,
			parent: null,
		});
	};
	const handlePickCategory = (id) => {
		setCategory({
			...category,
			parent: { ...list.find((item) => item.id === id) },
		});
	};
	return (
		<div className={cx("wrapper")}>
			<Controls.Input
				disabled={true}
				label={label}
				size={size}
				autoComplete={"off"}
				classNames={cx("category-input")}
				value={category && category.parent ? category.parent.name : ""}
				endAdornment={
					category &&
					category.parent && (
						<IconButton
							className={cx("btn", size)}
							onClick={clearCategory}
						>
							{icons.Button("icon").delete}
						</IconButton>
					)
				}
				startAdornment={
					category && category.parent && category.parent.parent && icons.Button({ className: cx("icon-parent") }).link
				}
			/>
			<PickCategory
				visibleObject={category}
				className={cx("btn", "pick", size)}
				list={list}
				tree={tree}
				idVisible={category.id ? category.id : ""}
				disabled={disabled}
				currentValue={category}
				maxLevel={levelDisplay}
				onOK={handlePickCategory}
				displayText={icons.Button("icon").list}
			/>
		</div>
	);
}

export default TextFelidCategory;
