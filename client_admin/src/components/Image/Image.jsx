import React, { useState, forwardRef } from "react";
import classNames from "classnames";

import styles from "./image.module.scss";
import images from "~/assets/images";

const Image = forwardRef(({ src, alt, className, fallback: customFallback = images.noImage, ...props }, ref) => {
	const [fallback, setFallback] = useState("");
	const handleError = () => {
		setFallback(customFallback);
	};
	return (
		<img
			className={classNames(styles.wrapper, className)}
			src={fallback || src}
			alt={alt}
			ref={ref}
			onError={handleError}
			{...props}
		/>
	);
});

export default Image;
