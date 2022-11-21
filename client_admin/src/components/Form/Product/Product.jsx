import React, { useState, useEffect, useLayoutEffect, useReducer } from "react";
import { Box, FormControl } from "@mui/material";
import OutlinedBox from "~/components/OutlinedBox";
import useForm from "~/hooks/useForm";
import Controls from "~/components/controls/";
import Form from "~/components/Form";
import validate from "~/utils/validate";

import styles from "./product.module.scss";
import categories from "~/components/controls/DropdownTree/sampleData";
import Editor from "~/components/controls/Editor/Editor";
import classNames from "classnames/bind";
import "./formMuiCustom.scss";
import { icons } from "~/assets/images";
import Button from "~/components/controls/Button";
import unit from "~/config/unit";
import BookConfig from "~/config/Book";

const propsBook = BookConfig.props;
const cx = classNames.bind(styles);
const data = {
	label: "search me",
	value: "searchme",
	children: [
		{
			label: "search me too",
			value: "searchmetoo",
			children: [
				{
					label: "No one can get me",
					value: "anonymous",
				},
			],
		},
	],
};

function reducer(state, action) {
	switch (action.type) {
		default:
			throw new Error();
	}
}
function Product(props) {
	const { isEdit = true, initialValues = propsBook.initialValues } = props;
	const { values, setValues, errors, setError, handleInputChange } = useForm(initialValues);
	const [openUpload, setOpenUpload] = useState(false);
	const [languageBook, setLanguageBook] = useState(categories[0].id);
	const [status, setStatus] = useState(propsBook.status.optionNew[0].id);
	let AddIcon = icons.Button.add;
	const handleOpenDialogUpload = () => {
		setOpenUpload(true);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (validate.book) {
			window.alert("error");
		} else {
			window.alert("noError");
		}
	};

	const handleLanguageBook = (e, value) => {
		setLanguageBook(value);
		setCategory(null);
	};
	const handleStatus = (e, value) => {
		setStatus(value);
		handleInputChange(e, value);
	};
	const handleCategory = (e, node) => {
		if (node) {
			setCategory(node.value);
		} else {
			setCategory(null);
		}
	};
	const setCategory = (value) => {
		let convert = {
			target: {
				name: "category",
			},
		};
		if (value) {
			convert.target.value = value;
		} else {
			convert.target.value = null;
		}
		handleInputChange(convert);
	};
	console.log(values);
	return (
		<Form onSubmit={handleSubmit}>
			<FormControl className="form-control">
				<div className={cx("wrapper")}>
					<OutlinedBox
						title={propsBook.criticalInformation.title}
						className={cx("critical-information")}
					>
						<div className={cx("name")}>
							<Controls.Input
								label={propsBook.name.title}
								fullWidth
								name="name"
								value={values.name}
								onChange={handleInputChange}
								errors={errors.name}
							/>
						</div>
						<Division3
							comp1={
								<Controls.Input
									label={propsBook.originalPrice.title}
									fullWidth
									name="originalPrice"
									type="number"
									configNumber={propsBook.originalPrice.config}
									endAdornment={unit.monetary}
									value={values.originalPrice}
									onChange={handleInputChange}
									errors={errors.originalPrice}
								/>
							}
							comp2={
								<Controls.Input
									fullWidth
									label={propsBook.discountRate.title}
									name="discountRate"
									configNumber={propsBook.discountRate.config}
									endAdornment={unit.percent}
									type="number"
									value={values.discountRate}
									onChange={handleInputChange}
									errors={errors.discountRate}
								/>
							}
							comp3={
								<Controls.Input
									fullWidth
									label={propsBook.price.title}
									disabled={true}
									name="price"
									type="number"
									configNumber={propsBook.price.config}
									endAdornment={unit.monetary}
									value={values.originalPrice * ((100 - values.discountRate) / 100)}
									onChange={handleInputChange}
									errors={errors.price}
								/>
							}
						/>
						<div className={cx("category")}>
							<OutlinedBox
								title={propsBook.type.title}
								type={"small"}
							>
								<Controls.RadioGroup
									label={"Ngôn ngữ"}
									name="name"
									items={categories}
									value={languageBook}
									onChange={handleLanguageBook}
									errors={errors.name}
								/>
								{categories.map((item) => {
									return (
										item.id === languageBook && (
											<div key={item.id}>
												<Controls.DropdownTree
													label={propsBook.category.title}
													name="category"
													items={item.children}
													onChange={handleCategory}
													errors={errors.name}
												/>
											</div>
										)
									);
								})}
							</OutlinedBox>
						</div>
					</OutlinedBox>
					<OutlinedBox
						title={propsBook.details.title}
						className={cx("details")}
					>
						<div className={cx("writer")}>
							<Controls.Input
								label={propsBook.authors.title}
								name="authors"
								value={values.authors}
								onChange={handleInputChange}
								errors={errors.authors}
							/>
							<Controls.Input
								label={propsBook.translators.title}
								name="translators"
								value={values.translators}
								onChange={handleInputChange}
								errors={errors.translators}
							/>
						</div>

						<Division3
							comp1={
								<Controls.Input
									label={propsBook.sku.title}
									name="sku"
									value={values.sku}
									onChange={handleInputChange}
									errors={errors.sku}
								/>
							}
							comp2={
								<Controls.Input
									label={propsBook.isbn13.title}
									name="isbn13"
									value={values.isbn13}
									onChange={handleInputChange}
									errors={errors.isbn13}
								/>
							}
							comp3={
								<Controls.Input
									label={propsBook.isbn10.title}
									name="isbn10"
									value={values.isbn10}
									onChange={handleInputChange}
									errors={errors.isbn10}
								/>
							}
						/>
						<Division3
							comp1={
								<Controls.Input
									label={propsBook.supplier.title}
									name="supplier"
									value={values.supplier}
									onChange={handleInputChange}
									errors={errors.supplier}
								/>
							}
							comp2={
								<Controls.Input
									label={propsBook.publisher.title}
									name="publisher"
									value={values.publisher}
									onChange={handleInputChange}
									errors={errors.publisher}
								/>
							}
							comp3={
								<Controls.DatePicker
									label={propsBook.publisherDate.title}
									name="publisherDate"
									value={values.publisherDate}
									onChange={handleInputChange}
								/>
							}
						/>
						<Division3
							comp1={
								<Controls.RadioGroup
									row={false}
									label={propsBook.status.title}
									name="status"
									items={propsBook.status.optionNew}
									value={status}
									onChange={handleStatus}
									errors={errors.status}
								/>
							}
							comp2={
								status === propsBook.status.optionNew[0].id ? (
									<Controls.Input
										label={propsBook.countInStock.title}
										name="countInStock"
										value={values.countInStock}
										type="number"
										endAdornment={unit.book}
										onChange={handleInputChange}
										errors={errors.countInStock}
									/>
								) : (
									<Controls.DatePicker
										label={propsBook.expectedDate.title}
										name="expectedDate"
										value={values.expectedDate}
										onChange={handleInputChange}
									/>
								)
							}
						/>

						<OutlinedBox
							className={cx("wrapper-box")}
							title={propsBook.specification.title}
							type={"small"}
						>
							<Controls.Input
								label={propsBook.width.title}
								endAdornment={unit.dimension}
								type="number"
								name="width"
								configNumber={propsBook.width.config}
								value={values.width}
								onChange={handleInputChange}
								errors={errors.width}
							/>
							<Controls.Input
								label={propsBook.height.title}
								type="number"
								name="height"
								configNumber={propsBook.height.config}
								endAdornment={unit.dimension}
								value={values.height}
								onChange={handleInputChange}
								errors={errors.height}
							/>
							<Controls.Input
								label={propsBook.weight.title}
								type="number"
								name="weight"
								configNumber={propsBook.weight.config}
								endAdornment={unit.weight}
								value={values.weight}
								onChange={handleInputChange}
								errors={errors.weight}
							/>

							<Controls.Input
								label={propsBook.page.title}
								endAdornment={unit.page}
								type="number"
								name="page"
								value={values.page}
								configNumber={propsBook.page.config}
								onChange={handleInputChange}
								errors={errors.page}
							/>
							<Controls.Input
								label={propsBook.bookCover.title}
								name="bookCover"
								value={values.bookCover}
								onChange={handleInputChange}
								errors={errors.bookCover}
							/>
						</OutlinedBox>
					</OutlinedBox>
					<OutlinedBox
						title={propsBook.descNImage.title}
						className={cx("descNImage")}
					>
						<Controls.Textarea
							label={propsBook.description.title}
							name="description"
							value={values.description}
							onChange={handleInputChange}
							errors={errors.description}
						/>
						<Button
							primary
							leftIcon={icons.Button("icons").add}
							type="button"
							onClick={handleOpenDialogUpload}
						>
							Thêm nè
						</Button>
						<Controls.Dialog
							open={openUpload}
							setOpen={setOpenUpload}
						>
							<Controls.UploadGallery></Controls.UploadGallery>
						</Controls.Dialog>
					</OutlinedBox>
					<Button
						primary
						type="submit"
					>
						Xác nhận
					</Button>
				</div>
			</FormControl>
		</Form>
	);
}
function Division3({ comp1, comp2, comp3 }) {
	return (
		<div className={cx("row")}>
			<div className={cx("colum")}>{comp1}</div>
			<div className={cx("colum")}>{comp2}</div>
			<div className={cx("colum")}>{comp3}</div>
		</div>
	);
}

export default Product;
