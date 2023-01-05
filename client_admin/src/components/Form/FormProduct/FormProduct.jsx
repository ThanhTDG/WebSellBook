import React, { useState, useEffect, useLayoutEffect, useReducer, useMemo } from "react";
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
import { message } from "antd";
import { ErrorDialog } from "~/utils/dialog";
import { generatePath, useNavigate } from "react-router-dom";
import typeFeature from "~/stores/types/typeFeature";
import { actions, constants } from "~/stores";
import TextFelidCategory from "~/components/TextFelidCategory";
import UploadImages from "~/components/Dialog/UploadImages";
import CardImage from "~/components/CardImage";
import * as productService from "~/services/productService";
import { Modal } from "antd";

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
const { confirm } = Modal;
function FormProduct(props) {
	const { editMode, dispatchEditMode, form, type = typeFeature.isEdit, product, setProduct, categories } = props;
	const { values, setValues, errors, setErrors, handleInputChange } = form;
	const navigate = useNavigate();
	const [step, setStep] = useState(type === typeFeature.isNew ? 0 : -1);
	useEffect(() => {
		if (!editMode.enableEdit) {
			if (JSON.stringify(values) !== JSON.stringify(product)) {
				console.log("setAll");
				setValues({ ...product });
				return;
			}
		}
		if (JSON.stringify(values) === JSON.stringify(product)) {
			dispatchEditMode(actions.setIsChange(false));
		} else {
			dispatchEditMode(actions.setIsChange(true));
		}
	}, [editMode.enableEdit, values]);
	console.log(values);
	const handleSubmit = (e) => {
		console.log("new");
		e.preventDefault();
		switch (type) {
			case typeFeature.isNew:
				switch (step) {
					case 0:
						const createProduct = async () => {
							let response = {};
							console.log(values);
							response = await productService.postProduct(values);
							if (response) {
								setProduct(response);
								setValues(response);
								dispatchEditMode(actions.setStatusIsSuccess());
								setStep(step + 1);
							}
						};
						if (!values.id) {
							dispatchEditMode(actions.setStatusIsLoading());
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
							//			response = await putProduct(values);
							if (response) {
								dispatchEditMode(actions.setStatusIsSuccess());
								navigate(generatePath(PageConfig.product.route, { id: values.id }));
							} else {
								dispatchEditMode(actions.setStatusIsError());
								message.error("Thất bại");
							}
						};
						dispatchEditMode(actions.setStatusIsLoading());
						UpdateProduct();
						break;
					default:
						ErrorDialog();
						break;
				}
				break;
			case typeFeature.isEdit:
				break;
			default:
				throw Error("Không có type feature");
		}
	};

	return (
		<Form>
			<FormControl className="form-control">
				<div className={cx("wrapper")}>
					{type === typeFeature.isNew && (
						<>
							<Stepper
								steps={steps}
								value={step}
							/>
							<SwitchStep
								action={handleSubmit}
								step={step}
								setStep={setStep}
								isChange={editMode.isChange}
							/>
						</>
					)}
					<CompInfo
						product={product}
						form={form}
						editMode={editMode}
						dispatchEditMode={dispatchEditMode}
						categories={categories}
						setProduct={setProduct}
						step={step}
					/>
				</div>
			</FormControl>
		</Form>
	);
}
function SwitchStep({ step, setStep, isChange, action }) {
	const getStringDisplay = (step) => {
		switch (step) {
			case 0:
				return constants.NEXT_STEP;
			case 1:
				if (!isChange) return constants.PASS;
				else return constants.NEXT_STEP;
			case 2:
				return constants.FINISH;
			default:
				return constants.NEXT_STEP;
		}
	};
	let title = getStringDisplay(step);
	return (
		<div className={cx("feature")}>
			{step > 0 && (
				<Controls.Button
					onClick={() => {
						setStep(step - 1);
					}}
					outline
					className={cx("pre-step")}
				>
					{"Bước trước"}
				</Controls.Button>
			)}
			<Controls.Button
				onClick={action}
				primary
			>
				{title}
			</Controls.Button>
		</div>
	);
}

function CompInfo(props) {
	const { form, product, step, categories, dispatchEditMode, editMode, setProduct } = props;
	const { values, setValues, errors, setError, handleInputChange } = form;
	const emptyFunction = () => {
		dispatchEditMode(actions.setIsChange(true));
	};
	let displayValues = editMode.enableEdit ? values : product;
	let funcHandle = editMode.enableEdit ? handleInputChange : emptyFunction;
	const criticalInformationMemo = useMemo(() => {
		return (
			<CriticalInformation
				product={displayValues}
				categories={categories}
				handleInputChange={funcHandle}
				setValues={setValues}
				errors={errors}
				setError={setError}
				dispatchEditMode={dispatchEditMode}
			/>
		);
	}, [values.name, values.originalPrice, values.discountRate, values.category, product, editMode.enableEdit]);
	const detailsMemo = useMemo(() => {
		return (
			<Details
				product={displayValues}
				handleInputChange={funcHandle}
				setValues={setValues}
				errors={errors}
				setError={setError}
				dispatchEditMode={dispatchEditMode}
			/>
		);
	}, [
		values.authors,
		values.translators,
		values.sku,
		values.isbn13,
		values.isbn10,
		values.supplier,
		values.publisher,
		values.publisherDate,
		values.countInStock,
		values.expectedDate,
		values.width,
		values.height,
		values.weight,
		values.page,
		values.bookCover,
		product,
		editMode.enableEdit,
	]);
	const descNImageMemo = useMemo(() => {
		return (
			<DescNImage
				product={displayValues}
				categories={categories}
				handleInputChange={funcHandle}
				setValues={setValues}
				errors={errors}
				setError={setError}
				editMode={editMode}
				dispatchEditMode={dispatchEditMode}
				setProduct={setProduct}
			/>
		);
	}, [product, editMode.enableEdit, values.images, values.description]);
	switch (step) {
		case 0:
			return <>{criticalInformationMemo}</>;
		case 1:
			return <>{detailsMemo}</>;
		case 2:
			return <>{descNImageMemo}</>;
		default:
			return (
				<>
					{criticalInformationMemo}
					{detailsMemo}
					{descNImageMemo}
				</>
			);
	}
}

function CriticalInformation(props) {
	const { product, setValues, errors, setError, handleInputChange, dispatchEditMode, categories } = props;

	const handleChangeIdCategory = (id) => {
		dispatchEditMode(actions.setEnableEdit(true));
		setValues({
			...product,
			category: { ...categories.list.find((category) => category.id === id) },
		});
	};
	const getCategoryId = (product) => {
		return product.category ? product.category.id : "";
	};
	const getCategoryById = (list, id) => {
		return list.find((category) => category.id === id);
	};
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
					value={product.name}
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
					value={product.originalPrice}
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
					value={product.discountRate}
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
					value={product.originalPrice * ((100 - product.discountRate) / 100)}
					onChange={handleInputChange}
					error={errors && errors.price ? errors.price : ""}
				/>
			</div>
			<TextFelidCategory
				category={getCategoryById(categories.list, getCategoryId(product))}
				handleIdChange={handleChangeIdCategory}
				list={categories.list}
				tree={categories.tree}
			/>
		</OutlinedBox>
	);
}
function Details(props) {
	const { product, setValues, errors, setError, handleInputChange, dispatchEditMode } = props;
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
					value={product.authors}
					onChange={handleInputChange}
					error={errors && errors.authors ? errors.authors : ""}
				/>
				<Controls.Input
					label={propsBook.translators.title}
					name="translators"
					value={product.translators}
					onChange={handleInputChange}
					error={errors && errors.translators ? errors.translators : ""}
				/>
			</div>
			<div className={cx("division")}>
				<Controls.Input
					label={propsBook.sku.title}
					name="sku"
					value={product.sku}
					onChange={handleInputChange}
					error={errors && errors.sku ? errors.sku : ""}
				/>
				<Controls.Input
					label={propsBook.isbn13.title}
					name="isbn13"
					value={product.isbn13}
					onChange={handleInputChange}
					error={errors && errors.isbn13 ? errors.isbn13 : ""}
				/>
				<Controls.Input
					label={propsBook.isbn10.title}
					name="isbn10"
					value={product.isbn10}
					onChange={handleInputChange}
					error={errors && errors.isbn10 ? errors.isbn10 : ""}
				/>
			</div>
			<div className={cx("division")}>
				<Controls.Input
					label={propsBook.supplier.title}
					name="supplier"
					value={product.supplier}
					onChange={handleInputChange}
					error={errors && errors.supplier ? errors.supplier : ""}
				/>
				<Controls.Input
					label={propsBook.publisher.title}
					name="publisher"
					value={product.publisher}
					onChange={handleInputChange}
					error={errors && errors.publisher ? errors.publisher : ""}
				/>
				<Controls.DatePicker
					label={propsBook.publisherDate.title}
					name="publisherDate"
					value={product.publisherDate}
					onChange={handleInputChange}
				/>
			</div>
			<div className={cx("division")}>
				<Controls.RadioGroup
					row={false}
					label={propsBook.status.title}
					name="status"
					items={propsBook.status.optionNew}
					value={status}
					onChange={handleStatus}
					error={errors && errors.status ? errors.status : ""}
				/>
			</div>
			{status === propsBook.status.optionNew[0].id ? (
				<Controls.Input
					label={propsBook.countInStock.title}
					name="countInStock"
					value={product.countInStock}
					type="number"
					endAdornment={unit.book}
					onChange={handleInputChange}
					error={errors && errors.countInStock ? errors.countInStock : ""}
				/>
			) : (
				<Controls.DatePicker
					label={propsBook.expectedDate.title}
					name="expectedDate"
					value={product.expectedDate}
					onChange={handleInputChange}
				/>
			)}

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
					value={product.width}
					onChange={handleInputChange}
					error={errors && errors.width ? errors.width : ""}
				/>
				<Controls.Input
					label={propsBook.height.title}
					type="number"
					name="height"
					configNumber={propsBook.height.config}
					endAdornment={unit.dimension}
					value={product.height}
					onChange={handleInputChange}
					error={errors && errors.height ? errors.height : ""}
				/>
				<Controls.Input
					label={propsBook.weight.title}
					type="number"
					name="weight"
					configNumber={propsBook.weight.config}
					endAdornment={unit.weight}
					value={product.weight}
					onChange={handleInputChange}
					error={errors && errors.weight ? errors.weight : ""}
				/>

				<Controls.Input
					label={propsBook.page.title}
					endAdornment={unit.page}
					type="number"
					name="page"
					value={product.page}
					configNumber={propsBook.page.config}
					onChange={handleInputChange}
					error={errors && errors.page ? errors.page : ""}
				/>
				<Controls.Input
					label={propsBook.bookCover.title}
					name="bookCover"
					value={product.bookCover}
					onChange={handleInputChange}
					error={errors && errors.bookCover ? errors.bookCover : ""}
				/>
			</OutlinedBox>
		</OutlinedBox>
	);
}
function DescNImage(props) {
	const { product, setValues, setProduct, errors, setError, handleInputChange, editMode, dispatchEditMode } = props;
	const [imagePick, setImagePick] = useState(null);
	console.log(product);
	useEffect(() => {
		if (!editMode.enableEdit) {
			setImagePick(null);
		}
	}, [editMode.enableEdit]);
	const handleRemove = (index) => {
		let images = product.images.filter((item) => item !== product.images[index]);
		console.log(images);
		setValues({
			...product,
			images: images,
		});
		dispatchEditMode(actions.setIsChange(true));
		setImagePick(null);
	};
	const handleImagePick = (index) => {
		setImagePick(index);
	};
	const handleSetDefault = () => {
		if (imagePick) {
			let list = [...product.images];
			list[0] = product.images[imagePick];
			list[imagePick] = product.images[0];

			setValues({
				...product,
				images: [...list],
			});
			dispatchEditMode(actions.setIsChange(true));
			setImagePick(null);
		}
	};
	const handleUploadImages = (images = []) => {
		let newListImage = images.map((image) => image);
		upDateImage(newListImage);
	};
	const upDateImage = async (images) => {
		dispatchEditMode(actions.setStatusIsLoading());
		const response = await productService.upLoadImages(images, product.id);
		if (response) {
			setImagePick(null);
			console.log(response, "image upload");
			let newImages = product.images.concat(response.paths);
			let newProduct = {
				...product,
				images: newImages,
			};
			const productResponse = await productService.updateProduct(newProduct, product.id);
			if (productResponse) {
				setProduct(productResponse);
				dispatchEditMode(actions.setStatusIsSuccess());
			}
		} else {
			dispatchEditMode(actions.setStatusIsError());
		}
	};
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
					value={product.description}
					onChange={handleInputChange}
					error={errors && errors.description ? errors.description : ""}
				/>
			</div>
			<div className={cx("img-manager")}>
				<OutlinedBox
					label={"Ảnh minh họa"}
					className={cx("gallery")}
				>
					<div className={cx("img-default")}>
						<Image
							className={cx("img")}
							src={product.images && product.images.length > 0 ? product.images[0] : ""}
						></Image>
					</div>
					<div className={cx("wrapper-images")}>
						<div className={cx("feature-images")}>
							<UploadImages
								maxImages={
									product.image
										? constants.MAX_IMAGES_PER_PRODUCT - product.images.length
										: constants.MAX_IMAGES_PER_PRODUCT
								}
								disabled={product.image && constants.MAX_IMAGES_PER_PRODUCT === product.images.length}
								title={
									<div className={cx("title-upload")}>
										<div className={cx("text-upload")}>{constants.UPLOAD_IMAGE}</div>
										{icons.Button({ className: cx("icon-upload") }).upload}
									</div>
								}
								className={cx("btn-upload")}
								actionUpload={handleUploadImages}
							/>
							{imagePick && imagePick !== 0 ? (
								<Controls.Button
									onClick={handleSetDefault}
									outline
									className={cx("btn-set-default")}
								>
									{constants.SET_DEFAULT}
								</Controls.Button>
							) : (
								""
							)}
						</div>
						{product.images && (
							<OutlinedBox
								label={propsBook.images.title}
								className={cx("images-outline")}
							>
								<div className={cx("list-image")}>
									{product.images.map((image, index) => (
										<CardImage
											viewDetail={index !== 0}
											onClick={() => handleImagePick(index)}
											handleRemove={() => handleRemove(index)}
											className={cx("image-card", index === 0 ? "active" : imagePick === index ? "change" : "")}
											src={image}
										/>
									))}
								</div>
							</OutlinedBox>
						)}
					</div>
				</OutlinedBox>
			</div>
		</OutlinedBox>
	);
}
export default FormProduct;
