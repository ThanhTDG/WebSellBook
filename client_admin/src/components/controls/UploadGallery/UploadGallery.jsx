import classNames from "classnames/bind";
import React from "react";
import RUG, { DropArea, DragArea, Card } from "react-upload-gallery";
import "react-upload-gallery/dist/style.css";
import Controls from "..";
import Button from "../Button";
import "./uploadGallery.scss";

function UploadGallery(props) {
	const { value } = props;
	return (
		<div className={"wrapper"}>
			<RUG
				autoUpload={false}
				customRequest={({
					uid,
					file,
					data, // blob
					send,
					action,
					headers,
					onProgress,
					onSuccess,
					onError,
				}) => {
					const response = { url: "..." };
					onProgress(uid, response);
					onSuccess(uid, response);
					onError(uid, {
						action,
						response,
					});
					return {
						abort() {},
					};
				}}
				source={(response) => response.url}
				// rules={{
				// 	limit: 10,
				// 	size: 20,
				// 	width: {
				// 		min: 1280,
				// 		max: 1920,
				// 	},
				// 	height: {
				// 		min: 720,
				// 		max: 1080,
				// 	},
				// }}
				accept={["jpg", "jpeg"]}
				onWarning={(type, rules) => {
					switch (type) {
						case "accept":
							console.log(`Only ${rules.accept.join(", ")}`);

						case "limit":
							console.log("limit <= ", rules.limit);

						case "size":
							console.log("max size <= ", rules.size);

						case "minWidth":
						case "minHeight":
							console.log("Dimensions > ", `${rules.width.min}x${rules.height.min}`);

						case "maxWidth":
						case "maxHeight":
							console.log("Dimensions < ", `${rules.width.max}x${rules.height.max}`);
						default:
					}
				}}
			>
				<DragArea className={"wrapper-card"}>{(image) => <Card image={image} />}</DragArea>
				{/* <DragArea>
					{(image) => (
						<div className="card">
							<Card image={image} />
						</div>
					)}
				</DragArea> */}
			</RUG>
			<Controls.Button outline>Hủy</Controls.Button>
			<Controls.Button primary>Đồng ý</Controls.Button>
		</div>
	);
}

export default UploadGallery;
