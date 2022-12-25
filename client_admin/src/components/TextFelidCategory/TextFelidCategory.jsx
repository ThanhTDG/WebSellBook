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
		list,
		tree,
		disabled,
		handleIdChange,
		idVisible = [],
		levelDisplay = constants.MAX_LEVEL,
	} = props;
	console.log(category);
	return (
		<div className={cx("wrapper")}>
			<Controls.Input
				disabled={true}
				label={label}
				size={size}
				autoComplete={"off"}
				classNames={cx("category-input")}
				value={category ? category.name : ""}
				endAdornment={
					category && (
						<IconButton
							className={cx("btn", size)}
							onClick={() => handleIdChange()}
						>
							{icons.Button("icon").delete}
						</IconButton>
					)
				}
				startAdornment={category && category.parent && icons.Button({ className: cx("icon-parent") }).link}
			/>
			<PickCategory
				idVisible={idVisible}
				className={cx("btn", "pick", size)}
				list={list}
				tree={tree}
				disabled={disabled}
				currentValue={category}
				maxLevel={levelDisplay}
				onOK={(id) => handleIdChange(id)}
				displayText={icons.Button("icon").list}
			/>
		</div>
	);
}

export default TextFelidCategory;
