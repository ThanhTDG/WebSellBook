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
	const {
		editMode,
		dispatchEditMode,
		isEdit = false,
		type = typeFeature.isEdit,
		product,
		setProduct,
		categories,
	} = props;
	console.log(product);
	const form = useForm({ ...product });
	const { values, setValues, errors, setErrors, handleInputChange } = form;
	const navigate = useNavigate();
	const [step, setStep] = useState(type === typeFeature.isNew ? 0 : -1);
	useEffect(() => {
		if (JSON.stringify(values) !== JSON.stringify(product)) {
			dispatchEditMode(actions.setIsChange(true));
			if (!editMode.enableEdit) {
				setValues({ ...product });
			}
		}
	}, [values]);
	useEffect(() => {
		if (!editMode.enableEdit) {
			setValues({ ...product });
		}
	}, [editMode.enableEdit]);

	const handleSubmit = (e) => {
		e.preventDefault();
		// switch (type) {
		// 	case featureType.isNew:
		// 		switch (step) {
		// 			case 0:
		// 				const createProduct = async () => {
		// 					let response = {};
		// 					//	response = await postProduct(values);
		// 					if (response) {
		// 						setProduct(response);
		// 						setValues(response);
		// 					}
		// 				};
		// 				if (!values.id) {
		// 					dispatchEditMode(actions.setStatusIsLoading);
		// 					createProduct();
		// 				} else {
		// 					setStep(step + 1);
		// 				}
		// 				break;
		// 			case 1:
		// 				setStep(step + 1);
		// 				break;
		// 			case 2:
		// 				const UpdateProduct = async () => {
		// 					let response = {};
		// 					//			response = await putProduct(values);
		// 					if (response) {
		// 						message.success("Thành công");
		// 						navigate(generatePath(PageConfig.product.route, { id: values.id }));
		// 					} else {
		// 						message.error("Thất bại");
		// 					}
		// 				};
		// 				UpdateProduct();
		// 				break;
		// 			default:
		// 				ErrorDialog();
		// 				break;
		// 		}
		// 		break;
		// 	case featureType.isEdit:
		// 		break;
		// 	default:
		// 		throw Error("Không có type feature");
		// }
	};
	return (
		<Form>
			<FormControl className="form-control">
				<div className={cx("wrapper")}>
					{type === typeFeature.isNew && (
						<Stepper
							steps={steps}
							value={step}
						/>
					)}
					<CompInfo
						editMode={editMode}
						isEdit={isEdit}
						product={product}
						step={step}
						form={form}
						categories={categories}
						setProduct={setProduct}
						dispatchEditMode={dispatchEditMode}
					/>
				</div>
			</FormControl>
			<SwitchStep
				setStep={setStep}
				step={step}
			/>
		</Form>
	);
}
function SwitchStep(step, setStep, isEqual) {
	const getStringDisplay = () => {
		switch (step) {
			case 0:
				return constants.NEXT_STEP;
			case 1:
				if (isEqual) return constants.PASS;
				else return constants.NEXT_STEP;
			case 2:
				return constants.FINISH;
		}
	};

	return (
		<div className={cx("feature")}>
			<Controls.Button>{getStringDisplay(step)}</Controls.Button>
		</div>
	);
}

function CompInfo(props) {
	const { form, isEdit, product, step, categories, dispatchEditMode, setProduct, editMode } = props;
	console.log(isEdit);
	switch (step) {
		case 0:
			return (
				<CriticalInformation
					form={form}
					product={product}
					isEdit={isEdit}
					categories={categories}
				/>
			);
		case 1:
			return (
				<Details
					form={form}
					product={product}
					isEdit={isEdit}
				/>
			);
		case 2:
			return (
				<DescNImage
					dispatchEditMode={dispatchEditMode}
					editMode={editMode}
					form={form}
					product={product}
					isEdit={isEdit}
					setProduct={setProduct}
				/>
			);
		default:
			return (
				<>
					<CriticalInformation
						dispatchEditMode={dispatchEditMode}
						form={form}
						product={product}
						isEdit={isEdit}
						categories={categories}
					/>
					<Details
						form={form}
						product={product}
						isEdit={isEdit}
					/>
					<DescNImage
						dispatchEditMode={dispatchEditMode}
						editMode={editMode}
						form={form}
						product={product}
						isEdit={isEdit}
						setProduct={setProduct}
					/>
				</>
			);
	}
}

function CriticalInformation(props) {
	const { form, isEdit, product, categories, dispatchEditMode } = props;
	const { values, setValues, errors, setError, handleInputChange } = form;
	const handleChangeIdCategory = (id) => {
		dispatchEditMode(actions.setEnableEdit(true));
		setValues({ ...values, category: { ...categories.list.find((category) => category.id === id) } });
	};
	const getCategoryId = (isEdit, values, product) => {
		if (isEdit) {
			return values.category ? values.category.id : "";
		} else {
			return product.category ? product.category.id : "";
		}
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
					value={isEdit ? values.name : product.name}
					onChange={isEdit ? handleInputChange : () => {}}
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
					value={isEdit ? values.originalPrice : product.originalPrice}
					onChange={isEdit ? handleInputChange : () => {}}
					error={errors && errors.originalPrice ? errors.originalPrice : ""}
				/>
				<Controls.Input
					fullWidth
					label={propsBook.discountRate.title}
					name="discountRate"
					configNumber={propsBook.discountRate.config}
					endAdornment={unit.percent}
					type="number"
					value={isEdit ? values.discountRate : product.discountRate}
					onChange={isEdit ? handleInputChange : () => {}}
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
					value={
						(isEdit ? values.originalPrice : product.originalPrice) *
						((100 - (isEdit ? values.discountRate : product.discountRate)) / 100)
					}
					onChange={isEdit ? handleInputChange : () => {}}
					error={errors && errors.price ? errors.price : ""}
				/>
			</div>
			<TextFelidCategory
				category={getCategoryById(categories.list, getCategoryId(isEdit, values, product))}
				handleIdChange={handleChangeIdCategory}
				list={categories.list}
				tree={categories.tree}
			/>
		</OutlinedBox>
	);
}
function Details(props) {
	const { form, isEdit, product } = props;
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
					value={isEdit ? values.authors : product.authors}
					onChange={isEdit ? handleInputChange : () => {}}
					error={errors && errors.authors ? errors.authors : ""}
				/>
				<Controls.Input
					label={propsBook.translators.title}
					name="translators"
					value={isEdit ? values.translators : product.translators}
					onChange={isEdit ? handleInputChange : () => {}}
					error={errors && errors.translators ? errors.translators : ""}
				/>
			</div>
			<div className={cx("division")}>
				<Controls.Input
					label={propsBook.sku.title}
					name="sku"
					value={isEdit ? values.sku : product.sku}
					onChange={isEdit ? handleInputChange : () => {}}
					error={errors && errors.sku ? errors.sku : ""}
				/>
				<Controls.Input
					label={propsBook.isbn13.title}
					name="isbn13"
					value={isEdit ? values.isbn13 : product.isbn13}
					onChange={isEdit ? handleInputChange : () => {}}
					error={errors && errors.isbn13 ? errors.isbn13 : ""}
				/>
				<Controls.Input
					label={propsBook.isbn10.title}
					name="isbn10"
					value={isEdit ? values.isbn10 : product.isbn10}
					onChange={isEdit ? handleInputChange : () => {}}
					error={errors && errors.isbn10 ? errors.isbn10 : ""}
				/>
			</div>
			<div className={cx("division")}>
				<Controls.Input
					label={propsBook.supplier.title}
					name="supplier"
					value={isEdit ? values.supplier : product.supplier}
					onChange={isEdit ? handleInputChange : () => {}}
					error={errors && errors.supplier ? errors.supplier : ""}
				/>
				<Controls.Input
					label={propsBook.publisher.title}
					name="publisher"
					value={isEdit ? values.publisher : product.publisher}
					onChange={isEdit ? handleInputChange : () => {}}
					error={errors && errors.publisher ? errors.publisher : ""}
				/>
				<Controls.DatePicker
					label={propsBook.publisherDate.title}
					name="publisherDate"
					value={isEdit ? values.publisherDate : product.publisherDate}
					onChange={isEdit ? handleInputChange : () => {}}
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
					value={isEdit ? values.countInStock : product.countInStock}
					type="number"
					endAdornment={unit.book}
					onChange={isEdit ? handleInputChange : () => {}}
					error={errors && errors.countInStock ? errors.countInStock : ""}
				/>
			) : (
				<Controls.DatePicker
					label={propsBook.expectedDate.title}
					name="expectedDate"
					value={isEdit ? values.expectedDate : product.expectedDate}
					onChange={isEdit ? handleInputChange : () => {}}
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
					value={isEdit ? values.width : product.width}
					onChange={isEdit ? handleInputChange : () => {}}
					error={errors && errors.width ? errors.width : ""}
				/>
				<Controls.Input
					label={propsBook.height.title}
					type="number"
					name="height"
					configNumber={propsBook.height.config}
					endAdornment={unit.dimension}
					value={isEdit ? values.height : product.height}
					onChange={isEdit ? handleInputChange : () => {}}
					error={errors && errors.height ? errors.height : ""}
				/>
				<Controls.Input
					label={propsBook.weight.title}
					type="number"
					name="weight"
					configNumber={propsBook.weight.config}
					endAdornment={unit.weight}
					value={isEdit ? values.weight : product.weight}
					onChange={isEdit ? handleInputChange : () => {}}
					error={errors && errors.weight ? errors.weight : ""}
				/>

				<Controls.Input
					label={propsBook.page.title}
					endAdornment={unit.page}
					type="number"
					name="page"
					value={isEdit ? values.page : product.page}
					configNumber={propsBook.page.config}
					onChange={isEdit ? handleInputChange : () => {}}
					error={errors && errors.page ? errors.page : ""}
				/>
				<Controls.Input
					label={propsBook.bookCover.title}
					name="bookCover"
					value={isEdit ? values.bookCover : product.bookCover}
					onChange={isEdit ? handleInputChange : () => {}}
					error={errors && errors.bookCover ? errors.bookCover : ""}
				/>
			</OutlinedBox>
		</OutlinedBox>
	);
}
function DescNImage(props) {
	const { form, isEdit, product, editMode, setProduct, dispatchEditMode } = props;
	const { values, setValues, errors, setError, handleInputChange } = form;
	const [listRemove, setListRemove] = useState([]);
	let typeDisplay = isEdit ? values : product;
	const [imagePick, setImagePick] = useState(null);
	console.log(values, product, listRemove);
	useEffect(() => {
		if (!editMode.enableEdit) {
			setListRemove([]);
			setImagePick(null);
		}
	}, [editMode.enableEdit]);
	const handleRemove = (index) => {
		let images = values.images.filter((item) => item !== values.images[index]);
		setValues({
			...values,
			images: images,
		});
		let removes = listRemove;
		removes.push(values.images[index]);
		setListRemove(removes);
	};
	const handleImagePick = (index) => {
		setImagePick(index);
	};
	const handleUploadImages = (images = []) => {
		let newListImage = images.map((image) => image);
		upDateImage(newListImage);
		//	setValues({ ...values, images: values.images.concat(newListImage) });
	};
	const upDateImage = async (images) => {
		console.log(images);
		dispatchEditMode(actions.setStatusIsLoading());
		const response = await productService.upLoadImages(images, values.id);
		if (response) {
			console.log(response, "image upload");
			let newImages = values.images.concat(response.paths);
			console.log(newImages);
			let product = {
				...values,
				images: newImages,
			};
			const productResponse = await productService.updateProduct(product, values.id);
			if (productResponse) {
				setProduct(productResponse);
				console.log("sucess");
				dispatchEditMode(actions.setStatusIsSuccess());
			}
		} else {
			dispatchEditMode(actions.setStatusIsError());
		}
		console.log(response);
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
					value={isEdit ? values.description : product.description}
					onChange={isEdit ? handleInputChange : () => {}}
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
							src={typeDisplay.images && typeDisplay.images.length > 0 ? typeDisplay.images[0] : ""}
						></Image>
					</div>
					<div className={cx("wrapper-images")}>
						<div className={cx("feature-images")}>
							<UploadImages
								maxImages={
									typeDisplay.image
										? constants.MAX_IMAGES_PER_PRODUCT - typeDisplay.images.length
										: constants.MAX_IMAGES_PER_PRODUCT
								}
								disabled={typeDisplay.image && constants.MAX_IMAGES_PER_PRODUCT === typeDisplay.images.length}
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
								<Controls.Button className={cx("btn-set-default")}>Đặt làm mặt định</Controls.Button>
							) : (
								""
							)}
						</div>
						{typeDisplay.images && (
							<OutlinedBox
								label={propsBook.images.title}
								className={cx("images-outline")}
							>
								<div className={cx("list-image")}>
									{typeDisplay.images.map((image, index) => (
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
