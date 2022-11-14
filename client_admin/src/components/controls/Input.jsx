import { TextField, InputAdornment } from "@mui/material";
import { type } from "@testing-library/user-event/dist/type";
import React from "react";

function Input(props) {
	const {
		name,
		label,
		value,
		onChange,
		id,
		fullWidth = false,
		required = false,
		disabled = false,
		type = null,
		error = null,
		endAdornment = null,
		startAdornment = null,
		configNumber = null,
	} = props;
	let inputProps = {};
	if (startAdornment) {
		inputProps.startAdornment = <InputAdornment position="start">{startAdornment}</InputAdornment>;
	}
	if (endAdornment) {
		inputProps.endAdornment = <InputAdornment position="end">{endAdornment}</InputAdornment>;
	}
	if (configNumber) {
		inputProps.inputProps = configNumber;
	}
	return (
		<TextField
			fullWidth={fullWidth}
			required={required}
			disabled={disabled}
			id={id}
			InputProps={{ ...inputProps }}
			label={label}
			size="Normal"
			name={name}
			value={value}
			onChange={onChange}
			type={type}
			{...(error && { error: true, helperText: error })}
		/>
	);
}

export default Input;
