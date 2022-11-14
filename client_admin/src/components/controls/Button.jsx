import React from "react";
import { Button as MuiButton } from "@mui/material";

function Button(props) {
	const { text, size, color, variant, onClick } = props;
	return (
		<MuiButton variant={variant} size={size} color={color} onClick={onClick}>
			Text
		</MuiButton>
	);
}

export default Button;
