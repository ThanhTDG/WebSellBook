import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Modal, Upload } from "antd";
import { upLoadImages } from "~/services/productService";

const beforeUpload = (file) => {
	const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
	if (!isJpgOrPng) {
		message.error("You can only upload JPG/PNG file!");
	}
	const isLt2M = file.size / 1024 / 1024 < 7;
	if (!isLt2M) {
		message.error("Image must smaller than 2MB!");
	}
	return isJpgOrPng && isLt2M;
};

const getBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});

const UpLoadImage = (props) => {
	const { action, id, listImage } = props;
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState("");
	const [previewTitle, setPreviewTitle] = useState("");
	const [progress, setProgress] = useState(0);
	const [fileList, setFileList] = useState(listImage);
	const handleCancel = () => setPreviewOpen(false);
	const handlePreview = async (file) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}
		setPreviewImage(file.url || file.preview);
		setPreviewOpen(true);
		setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf("/") + 1));
	};
	const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
	const uploadImages = async (options) => {
		const { onSuccess, onError, file, onProgress } = options;

		const fmData = new FormData();
		const config = {
			headers: { "content-type": "multipart/form-data" },
			onUploadProgress: (event) => {
				const percent = Math.floor((event.loaded / event.total) * 100);
				setProgress(percent);
				if (percent === 100) {
					setTimeout(() => setProgress(0), 1000);
				}
				onProgress({ percent: (event.loaded / event.total) * 100 });
			},
		};
		fmData.append("images", file);
		try {
			const res = await action({ id: id, fmData: fmData });

			onSuccess("Ok");
		} catch (err) {
			const error = new Error("Some error");
			onError({ err });
		}
	};

	const uploadButton = (
		<div>
			<PlusOutlined />
			<div
				style={{
					marginTop: 8,
				}}
			>
				Upload
			</div>
		</div>
	);
	return (
		<>
			<Upload
				listType="picture-card"
				fileList={fileList}
				onPreview={handlePreview}
				onChange={handleChange}
				beforeUpload={beforeUpload}
				customRequest={uploadImages}
				multiple
			>
				{fileList && fileList.length >= 8 ? null : uploadButton}
			</Upload>
			<Modal
				open={previewOpen}
				title={previewTitle}
				footer={null}
				onCancel={handleCancel}
			>
				<img
					alt="image"
					style={{
						width: "100%",
					}}
					src={previewImage}
				/>
			</Modal>
		</>
	);
};
export default UpLoadImage;
