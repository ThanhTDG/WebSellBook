import classNames from "classnames/bind";
import React from "react";
import { useState } from "react";
import Controls from "~/components/controls";
import PickCategory from "~/components/Dialog/PickCategory";
import styles from "./categoryForm.module.scss";

const cx = classNames.bind(styles);
function CategoryFrom(props) {
	const { data, listCategory } = props;
	const [category, setCategory] = useState(data);
	const [categories, setCategories] = useState(listCategory);
	return (
		<div className={cx("wrapper")}>
			<Controls.Input
				className={cx("name-category")}
				value={category.name}
			/>
			<Controls.Input
				className={cx("name-category")}
				value={category.parent ? categories.list.find((item) => category.parent.id === item.id).name : ""}
			/>
			<PickCategory
				categories={categories}
				category={category}
			/>
		</div>
	);
}

export default CategoryFrom;
