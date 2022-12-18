import classNames from "classnames/bind";
import React from "react";
import { useState } from "react";
import Controls from "~/components/controls";
import CreateNUpdateDay from "~/components/CreateNUpdateDay";
import PickCategory from "~/components/Dialog/PickCategory";
import { constants } from "~/stores";
import styles from "./categoryForm.module.scss";

const cx = classNames.bind(styles);
function CategoryFrom(props) {
	const { category, categories, handleChangeParent } = props;

	return (
		<div className={cx("wrapper")}>
			<div className={cx("form")}>
				<Controls.Input
					name="nameCategory"
					fullWidth
					label={constants.NAME_CATEGORY}
					value={category.name ? category.name : ""}
				/>
				<div className={cx("category-parent")}>
					<Controls.Input
						name="parentCategory"
						label={constants.PARENT_CATEGORY}
						value={category.parent ? categories.list.find((item) => category.parent.id === item.id).name : ""}
					/>
					<PickCategory
						onOK={handleChangeParent}
						categories={categories}
						category={category}
					/>
				</div>
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
