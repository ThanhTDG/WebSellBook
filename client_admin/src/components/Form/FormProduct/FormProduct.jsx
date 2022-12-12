import React, { useState, useEffect, useLayoutEffect, useReducer } from "react";
import { Box, FormControl } from "@mui/material";
import OutlinedBox from "~/components/OutlinedBox";
import Form from "~/components/Form";

import useForm from "~/hooks/useForm";
import Controls from "~/components/controls/";
import validate, { bookValidation } from "~/utils/validate";
import styles from "./product.module.scss";
import categories from "~/components/controls/DropdownTree/sampleData";
import Editor from "~/components/controls/Editor/Editor";
import classNames from "classnames/bind";
import "./formMuiCustom.scss";
import { icons } from "~/assets/images";
import Button from "~/components/controls/Button";
import unit from "~/stores/ComponentConfigs/unit";
import BookConfig from "~/stores/Book";
import UpLoadImage from "~/components/UpLoadImage";
import Image from "~/components/Image";
import PageConfig from "~/stores/pages";
import Stepper from "~/components/Stepper/Stepper";
import { postProduct, putProduct, upLoadImages } from "~/services/productService";
import { message } from "antd";
import { ErrorDialog } from "~/utils/dialog";
import { generatePath, useNavigate } from "react-router-dom";

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
const steps = [
	BookConfig.props.criticalInformation.title,
	BookConfig.props.details.title,
	BookConfig.props.descNImage.title,
];
function FormProduct(props) {
	const { edit = false, initialValues = propsBook.initialValues } = props;
	const { values, setValues, errors, setError, handleInputChange } = useForm(initialValues);
	const [isNew, setIsNew] = useState(window.location.pathname === PageConfig.newProduct.route);
	const [step, setStep] = useState(0);
	const [isEdit, setIsEdit] = useState(edit);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	let AddIcon = icons.Button.add;
	const navigate = useNavigate();
	const handleSubmit = (e) => {
		e.preventDefault();
		if (edit) {
		}
		if (isNew) {
			switch (step) {
				case 0:
					const createProduct = async () => {
						let response = {};
						{
							response = await postProduct(values);
							if (response) {
								console.log(response._id);
								let convert = {
									target: {
										name: "id",
										value: response._id,
									},
								};
								handleInputChange(convert);
								if (!isError) {
									setStep(step + 1);
								}
							} else {
								setIsError(true);
							}
							setIsLoading(false);
						}
					};
					if (!values.id) {
						setIsLoading(true);
						createProduct();
					} else {
						setStep(step + 1);
					}

					break;
				case 1:
					setStep(step + 1);
					break;
				case 2:
					const UpdateProduct = async () => {
						let response = {};
						response = await putProduct(values);
						if (response) {
							message.success("Thành công");

							navigate(generatePath(PageConfig.product.route, { id: values.id }));
						} else {
							message.error("Thất bại");
						}
						setIsLoading(false);
					};
					setIsLoading(true);
					UpdateProduct();
					break;
				default:
					ErrorDialog();
					break;
			}
		}
	};
	return (
		<Form onSubmit={handleSubmit}>
			<FormControl className="form-control">
				<div className={cx("wrapper")}>
					{isNew && (
						<Stepper
							steps={steps}
							value={step}
						/>
					)}
					{isNew ? (
						<CompsStep
							values={values}
							step={step}
							handleInputChange={handleInputChange}
							error={errors}
						/>
					) : (
						<CompsStep
							values={values}
							handleInputChange={handleInputChange}
							error={errors}
						/>
					)}
				</div>

				{isNew && (
					<div className={cx("new-button")}>
						{step > 0 && (
							<Button
								className={cx("btn-cancel")}
								type="button"
								outline
								onClick={() => {
									setStep(step - 1);
								}}
							>
								Quay lại
							</Button>
						)}
						<Button
							primary
							className={cx("btn-confirm")}
						>{`${step === 2 ? "Xác nhận" : "Tiếp theo"}`}</Button>
					</div>
				)}
				{edit && (
					<div className={cx("new-button")}>
						<Button
							primary
							className={cx("btn-confirm")}
						>{`Xác nhận`}</Button>
					</div>
				)}
			</FormControl>
		</Form>
	);
}

function CompsStep(props) {
	const { step, values, handleInputChange, errors } = props;
	switch (step) {
		case 0:
			return (
				<CriticalInformation
					values={values}
					handleInputChange={handleInputChange}
					error={errors}
				/>
			);
		case 1:
			return (
				<Details
					values={values}
					handleInputChange={handleInputChange}
					error={errors}
				/>
			);
		case 2:
			return (
				<DescNImage
					values={values}
					handleInputChange={handleInputChange}
					error={errors}
				/>
			);
		default:
			return (
				<>
					<CriticalInformation
						values={values}
						handleInputChange={handleInputChange}
						error={errors}
					/>
					<Details
						values={values}
						handleInputChange={handleInputChange}
						error={errors}
					/>
					<DescNImage
						values={values}
						handleInputChange={handleInputChange}
						error={errors}
					/>
				</>
			);
	}
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
function CriticalInformation(props) {
	const { values, handleInputChange, errors } = props;
	const [languageBook, setLanguageBook] = useState(categories[0].id);
	const handleLanguageBook = (e, value) => {
		setLanguageBook(value);
		setCategory(null);
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
			convert.target.value = value.id;
		} else {
			convert.target.value = null;
		}
		handleInputChange(convert);
	};
	return (
		<OutlinedBox
			title={propsBook.criticalInformation.title}
			className={cx("critical-information")}
		>
			<div className={cx("name")}>
				<Controls.Input
					label={propsBook.name.title}
					fullWidth
					name="name"
					require={propsBook.name.require}
					value={values.name}
					onChange={handleInputChange}
					error={errors && errors.name ? errors.name : ""}
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
						error={errors && errors.originalPrice ? errors.originalPrice : ""}
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
						error={errors && errors.discountRate ? errors.discountRate : ""}
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
						error={errors && errors.price ? errors.price : ""}
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
						name="language"
						items={categories}
						value={languageBook}
						onChange={handleLanguageBook}
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
										error={errors && errors.category ? errors.category : ""}
									/>
								</div>
							)
						);
					})}
				</OutlinedBox>
			</div>
		</OutlinedBox>
	);
}
function Details(props) {
	const { values, handleInputChange, errors } = props;
	const [status, setStatus] = useState(propsBook.status.optionNew[0].id);
	const handleStatus = (e, value) => {
		setStatus(value);
		handleInputChange(e, value);
	};

	return (
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
					error={errors && errors.authors ? errors.authors : ""}
				/>
				<Controls.Input
					label={propsBook.translators.title}
					name="translators"
					value={values.translators}
					onChange={handleInputChange}
					error={errors && errors.translators ? errors.translators : ""}
				/>
			</div>

			<Division3
				comp1={
					<Controls.Input
						label={propsBook.sku.title}
						name="sku"
						value={values.sku}
						onChange={handleInputChange}
						error={errors && errors.sku ? errors.sku : ""}
					/>
				}
				comp2={
					<Controls.Input
						label={propsBook.isbn13.title}
						name="isbn13"
						value={values.isbn13}
						onChange={handleInputChange}
						error={errors && errors.isbn13 ? errors.isbn13 : ""}
					/>
				}
				comp3={
					<Controls.Input
						label={propsBook.isbn10.title}
						name="isbn10"
						value={values.isbn10}
						onChange={handleInputChange}
						error={errors && errors.isbn10 ? errors.isbn10 : ""}
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
						error={errors && errors.supplier ? errors.supplier : ""}
					/>
				}
				comp2={
					<Controls.Input
						label={propsBook.publisher.title}
						name="publisher"
						value={values.publisher}
						onChange={handleInputChange}
						error={errors && errors.publisher ? errors.publisher : ""}
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
						error={errors && errors.status ? errors.status : ""}
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
							error={errors && errors.countInStock ? errors.countInStock : ""}
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
					error={errors && errors.width ? errors.width : ""}
				/>
				<Controls.Input
					label={propsBook.height.title}
					type="number"
					name="height"
					configNumber={propsBook.height.config}
					endAdornment={unit.dimension}
					value={values.height}
					onChange={handleInputChange}
					error={errors && errors.height ? errors.height : ""}
				/>
				<Controls.Input
					label={propsBook.weight.title}
					type="number"
					name="weight"
					configNumber={propsBook.weight.config}
					endAdornment={unit.weight}
					value={values.weight}
					onChange={handleInputChange}
					error={errors && errors.weight ? errors.weight : ""}
				/>

				<Controls.Input
					label={propsBook.page.title}
					endAdornment={unit.page}
					type="number"
					name="page"
					value={values.page}
					configNumber={propsBook.page.config}
					onChange={handleInputChange}
					error={errors && errors.page ? errors.page : ""}
				/>
				<Controls.Input
					label={propsBook.bookCover.title}
					name="bookCover"
					value={values.bookCover}
					onChange={handleInputChange}
					error={errors && errors.bookCover ? errors.bookCover : ""}
				/>
			</OutlinedBox>
		</OutlinedBox>
	);
}
function DescNImage(props) {
	const { values, handleInputChange, errors } = props;
	return (
		<OutlinedBox
			title={propsBook.descNImage.title}
			className={cx("descNImage")}
		>
			<div className={cx("title-desc")}>
				<div className={cx("title-desc")}>{propsBook.description.title}</div>
				<Controls.Textarea
					label={propsBook.description.title}
					name="description"
					value={values.description}
					onChange={handleInputChange}
					error={errors && errors.description ? errors.description : ""}
				/>
			</div>

			<div className={cx("img-manager")}>
				<OutlinedBox
					title={propsBook.images.title}
					className={cx("gallery")}
				>
					<div className={cx("img-default")}>
						<Image
							className={cx("img")}
							src={values ? values.images : ""}
						></Image>
					</div>
					<OutlinedBox
						title={propsBook.images.title}
						className={cx("img-upload")}
					>
						<UpLoadImage
							action={upLoadImages}
							id={values.id}
							listImage={values.images}
						></UpLoadImage>
					</OutlinedBox>
				</OutlinedBox>
			</div>
		</OutlinedBox>
	);
}
export default FormProduct;
