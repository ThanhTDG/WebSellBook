import Modal from "antd/es/modal/Modal";
import classNames from "classnames/bind";
import React, { useEffect, useState } from "react";
import { icons } from "~/assets/images";
import Controls from "~/components/controls";
import Image from "~/components/Image";
import { constants } from "~/stores";
import styles from "./uploadAvatar.module.scss";
import ImageUploading from "react-images-uploading";

const cx = classNames.bind(styles);
function UploadAvatar(props) {
	const {
		actionUpload,
		maxImages = constants.MAX_IMAGES_PER_PRODUCT,
		title = "Đăng ảnh",
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
				className={cx("btn-change-avatar")}
				outline
				rightIcon={icons.Button("").imageChange}
				onClick={handleOpenDialog}
			>
				{constants.CHANGE_IMAGE}
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
								{imageList.length > 0 &&
									imageList.map((image) => (
										<div className={cx("background")}>
											<Image
												className={cx("avatar")}
												src={image.data_url}
											/>
										</div>
									))}
								<Controls.Button
									outline
									className={cx("btn-upload")}
									onClick={onImageUpload}
									{...dragProps}
								>
									{"Nhấn hoặc kéo thả vào vùng này"}
								</Controls.Button>

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

export default UploadAvatar;
