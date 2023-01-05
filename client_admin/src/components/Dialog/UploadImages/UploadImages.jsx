import classNames from "classnames/bind";
import React, { useEffect } from "react";
import Modal from "antd/es/modal/Modal";
import ImageUploading from "react-images-uploading";

import Controls from "~/components/controls";
import styles from "./uploadImage.module.scss";
import { useState } from "react";
import Image from "~/components/Image";
import CardImage from "~/components/CardImage";
import OutlinedBox from "~/components/OutlinedBox";
import { constants } from "~/stores";
const cx = classNames.bind(styles);

function UploadImages(props) {
	const {
		actionUpload,
		maxImages = constants.MAX_IMAGES_PER_PRODUCT,
		title = "Đăng ảnh",
		handleOK,
		className,
		disabled = false,
	} = props;
	const [images, setImages] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	useEffect(() => {
		if (!isOpen) {
			setImages([]);
		}
	}, [isOpen]);
	const handleChangeImages = (imageList, addUpdateIndex) => {
		console.log(imageList, addUpdateIndex);
		setImages(imageList);
	};
	const handleOpenDialog = () => {
		if (!isOpen) {
			setIsOpen(true);
		}
	};
	const handleCloseDialog = () => {
		if (isOpen) {
			setIsOpen(false);
		}
	};
	const handleOk = () => {
		if (images.length > 0) {
			actionUpload(images);
			handleCloseDialog();
		}
	};
	return (
		<>
			<Controls.Button
				className={className}
				primary
				onClick={handleOpenDialog}
				disabled={disabled}
			>
				{title}
			</Controls.Button>
			<Modal
				className={cx("dialog")}
				title={title}
				centered
				open={isOpen}
				onOk={handleOk}
				onCancel={handleCloseDialog}
			>
				<div className={cx("wrapper")}>
					<ImageUploading
						multiple
						value={images}
						onChange={handleChangeImages}
						maxNumber={maxImages}
						dataURLKey="data_url"
					>
						{({
							imageList,
							onImageUpload,
							errors,
							onImageUpdate,
							onImageRemove,
							isDragging,
							dragProps,
						}) => (
							<div className={cx("upload-and-list")}>
								<Controls.Button
									outline
									className={cx("btn-upload")}
									onClick={onImageUpload}
									{...dragProps}
								>
									{"Nhấn hoặc kéo thả vào vùng này"}
									<div
										className={cx("")}
									>{`${images.length} / ${maxImages}`}</div>
								</Controls.Button>
								{imageList.length > 0 && (
									<OutlinedBox
										label={"Danh sách ảnh"}
										className={cx("outline")}
									>
										<div className={cx("gallery")}>
											{imageList.map((image, index) => (
												<CardImage
													className={cx("image-card")}
													handleRemove={() => onImageRemove(index)}
													src={image["data_url"]}
												/>
											))}
										</div>
									</OutlinedBox>
								)}
								{errors && (
									<div className={cx("error-text")}>
										{errors.maxNumber && (
											<span> Số lượng ảnh có thể đăng lên: {maxImages}</span>
										)}
										{errors.acceptType && (
											<span>File được đăng tải không được chấp nhận</span>
										)}
										{errors.maxFileSize && (
											<span>Kích thước ảnh quá mức tối đa</span>
										)}
										{errors.resolution && <span></span>}
									</div>
								)}
							</div>
						)}
					</ImageUploading>
				</div>
			</Modal>
		</>
	);
}

export default UploadImages;
