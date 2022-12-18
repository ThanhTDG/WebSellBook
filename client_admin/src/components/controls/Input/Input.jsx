import { TextField, InputAdornment, FormControl, FormLabel, FilledInput, InputLabel } from "@mui/material";
import { type } from "@testing-library/user-event/dist/type";
import React from "react";

function Input(props) {
	const {
		className = null,
		name,
		variant = "outlined",
		label,
		value,
		onChange,
		id,
		fullWidth = true,
		required = false,
		disabled = false,
		type = null,
		placeholder = null,
		error = false,
		endAdornment = null,
		startAdornment = null,
		configNumber = null,
		oncClickEndAdornment,
		oncClickStartAdornment,
		size = "normal",
	} = props;
	let inputProps = {};
	if (startAdornment) {
		inputProps.startAdornment = (
			<InputAdornment
				onClick={oncClickStartAdornment}
				position="start"
			>
				{startAdornment}
			</InputAdornment>
		);
	}
	if (endAdornment) {
		inputProps.endAdornment = (
			<InputAdornment
				onClick={oncClickEndAdornment}
				position="end"
			>
				{endAdornment}
			</InputAdornment>
		);
	}
	if (configNumber) {
		inputProps.inputProps = configNumber;
	}
	return (
		// <FormControl
		// 	fullWidth={fullWidth}
		// 	className={className}
		// >
		<TextField
			fullWidth={fullWidth}
			placeholder={placeholder}
			variant={variant}
			label={label}
			disabled={disabled}
			id={id}
			size={size}
			name={name}
			value={value}
			onChange={onChange}
			type={type}
			required={required}
			InputProps={{ ...inputProps }}
			{...(error && { error: true, helperText: error })}
		/>
		// </FormControl>
	);
}

export default Input;
