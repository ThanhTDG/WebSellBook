import React, { useState, useEffect, useLayoutEffect, useReducer } from "react";
import { Box, FormControl } from "@mui/material";
import OutlinedBox from "~/components/OutlinedBox";
import Form from "~/components/Form";

import useForm from "~/hooks/useForm";
import Controls from "~/components/controls/";
import validate, { bookValidation } from "~/utils/validate";
import styles from "./formProduct.module.scss";
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
import featureType from "~/stores/types/featureType";
import { actions } from "~/stores";
import TextFelidCategory from "~/components/TextFelidCategory";

const propsBook = BookConfig.props;
const cx = classNames.bind(styles);

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
	const {
		editMode,
		dispatchEditMode,
		isEdit = false,
		type = featureType.isEdit,
		product,
		setProduct,
		categories,
	} = props;
	const form = useForm(product);
	const { values, setValues, errors, setErrors, handleInputChange } = form;
	const navigate = useNavigate();
	const [step, setStep] = useState(type === featureType.isNew ? 0 : -1);
	useEffect(() => {
		if (JSON.stringify(values) !== JSON.stringify(product)) {
			dispatchEditMode(actions.setIsChange(true));
		}
	}, [values]);

	const handleSubmit = (e) => {
		e.preventDefault();
		switch (type) {
			case featureType.isNew:
				switch (step) {
					case 0:
						const createProduct = async () => {
							let response = {};
							response = await postProduct(values);
							if (response) {
								setProduct(response);
								setValues(response);
							}
						};
						if (!values.id) {
							dispatchEditMode(actions.setStatusIsLoading);
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
						};
						UpdateProduct();
						break;
					default:
						ErrorDialog();
						break;
				}
				break;
			case featureType.isEdit:
				break;
			default:
				throw Error("Không có type feature");
		}
	};
	return (
		<Form onSubmit={handleSubmit}>
			<FormControl className="form-control">
				<div className={cx("wrapper")}>
					{type === featureType.isNew && (
						<Stepper
							steps={steps}
							value={step}
						/>
					)}
					<CompInfo
						values={values}
						step={step}
						form={form}
						categories={categories}
					/>
				</div>
			</FormControl>
		</Form>
	);
}
// function ButtonAction() {
// 	return;
// 	<div className={cx("new-button")}>
// 		{step > 0 && (
// 			<Button
// 				className={cx("btn-cancel")}
// 				type="button"
// 				outline
// 				onClick={() => {
// 					setStep(step - 1);
// 				}}
// 			>
// 				Quay lại
// 			</Button>
// 		)}
// 		<Button
// 			primary
// 			className={cx("btn-confirm")}
// 		>{`${step === 2 ? "Xác nhận" : "Tiếp theo"}`}</Button>
// 	</div>;
// }
// {
// 	edit && (
// 		<div className={cx("new-button")}>
// 			<Button
// 				primary
// 				className={cx("btn-confirm")}
// 			>{`Xác nhận`}</Button>
// 		</div>
// 	);
// }

function CompInfo(props) {
	const { form, isEdit, product, step, categories } = props;
	switch (step) {
		case 0:
			return (
				<CriticalInformation
					form={form}
					values={form.values}
					categories={categories}
				/>
			);
		case 1:
			return (
				<Details
					form={form}
					values={form.values}
				/>
			);
		case 2:
			return (
				<DescNImage
					form={form}
					values={form.values}
				/>
			);
		default:
			return (
				<>
					<CriticalInformation
						form={form}
						values={form.values}
						categories={categories}
					/>
					<Details form={form} />
					<DescNImage form={form} />
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
	const { form, values, categories } = props;
	const { setValues, errors, setError, handleInputChange } = form;
	console.log(categories);
	return (
		<OutlinedBox
			label={propsBook.criticalInformation.title}
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
			<div className={cx("division")}>
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
			</div>
			<div className={cx("category")}>
				<TextFelidCategory
					category={values.category ? values.category : ""}
					list={categories.list}
					tree={categories.tree}
				/>
			</div>
		</OutlinedBox>
	);
}
function Details(props) {
	const { form } = props;
	const { values, setValues, errors, setError, handleInputChange } = form;
	const [status, setStatus] = useState(propsBook.status.optionNew[0].id);
	const handleStatus = (e, value) => {
		setStatus(value);
		handleInputChange(e, value);
	};

	return (
		<OutlinedBox
			label={propsBook.details.title}
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
			<div className={cx("division")}>
				<Controls.Input
					label={propsBook.sku.title}
					name="sku"
					value={values.sku}
					onChange={handleInputChange}
					error={errors && errors.sku ? errors.sku : ""}
				/>
				<Controls.Input
					label={propsBook.isbn13.title}
					name="isbn13"
					value={values.isbn13}
					onChange={handleInputChange}
					error={errors && errors.isbn13 ? errors.isbn13 : ""}
				/>
				<Controls.Input
					label={propsBook.isbn10.title}
					name="isbn10"
					value={values.isbn10}
					onChange={handleInputChange}
					error={errors && errors.isbn10 ? errors.isbn10 : ""}
				/>
			</div>

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
	const { form } = props;
	const { values, setValues, errors, setError, handleInputChange } = form;
	return (
		<OutlinedBox
			label={propsBook.descNImage.title}
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
