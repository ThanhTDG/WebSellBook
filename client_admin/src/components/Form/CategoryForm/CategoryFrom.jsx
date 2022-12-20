import classNames from "classnames/bind";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Controls from "~/components/controls";
import CreateNUpdateDay from "~/components/CreateNUpdateDay";
import PickCategory from "~/components/Dialog/PickCategory";
import useDebounce from "~/hooks/useDebounce";
import useForm from "~/hooks/useForm";
import { actions, constants } from "~/stores";
import styles from "./categoryForm.module.scss";

const cx = classNames.bind(styles);
function CategoryFrom(props) {
	const { className, category, editMode, canEdit = false, dispatchEditMode, PickParent } = props;
	const { values, setValues, errors, setError, handleInputChange } = useForm(category, false);
	console.log(canEdit, editMode);

	useEffect(() => {
		if (category.id !== values.id) {
			setValues({ ...category });
			return;
		}
		if (canEdit) {
			if (JSON.stringify(category) !== JSON.stringify(values)) {
				dispatchEditMode(
					actions.setValueChange({
						...values,
					})
				);
			} else {
				//dispatchEditMode(actions.setIsChange(false));
			}
			console.log(editMode);
		}
	}, [values, category]);

	return (
		<div className={cx("wrapper", className)}>
			<div className={cx("form")}>
				<Controls.Input
					name="name"
					fullWidth
					label={constants.NAME_CATEGORY}
					onChange={canEdit ? handleInputChange : () => {}}
					value={values.name ? values.name : ""}
				/>
				<div className={cx("category-parent")}>
					<Controls.Input
						disabled={true}
						name="parentCategory"
						fullWidth
						label={constants.PARENT_CATEGORY}
						value={category.parent ? category.parent.name : ""}
					/>
					{PickParent}
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
