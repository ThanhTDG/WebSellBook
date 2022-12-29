import classNames from "classnames/bind";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import * as initStates from "~/stores/initStates";
import Controls from "~/components/controls";
import CreateNUpdateDay from "~/components/CreateNUpdateDay";
import PickCategory from "~/components/Dialog/PickCategory";
import useDebounce from "~/hooks/useDebounce";
import { actions, constants } from "~/stores";
import styles from "./categoryForm.module.scss";

const cx = classNames.bind(styles);
function CategoryFrom(props) {
	const { className, category, handleChange, PickParent } = props;
	return (
		<div className={cx("wrapper", className)}>
			<div className={cx("form")}>
				<Controls.Input
					name="name"
					fullWidth
					label={constants.NAME_CATEGORY}
					onChange={handleChange}
					value={category.name ? category.name : ""}
				/>
				<div className={cx("category-parent")}>{PickParent}</div>
				{category.createdAt && category.updatedAt && (
					<CreateNUpdateDay
						createdAt={category.createdAt}
						updatedAt={category.updatedAt}
					/>
				)}
			</div>
		</div>
	);
}

export default CategoryFrom;
