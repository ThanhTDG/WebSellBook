import { TextField, InputAdornment, FormControl, FormLabel, FilledInput, InputLabel } from "@mui/material";
import { type } from "@testing-library/user-event/dist/type";
import React from "react";

function Input(props) {
	const {
		className = null,
		name,
		label,
		value,
		onChange,
		id,
		fullWidth = true,
		required = false,
		disabled = false,
		type = null,
		error = null,
		endAdornment = null,
		startAdornment = null,
		configNumber = null,
		oncClickEndAdornment,
		oncClickStartAdornment,
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
		<FormControl
			fullWidth={fullWidth}
			className={className}
		>
			<TextField
				label={label}
				required={required}
				disabled={disabled}
				id={id}
				InputProps={{ ...inputProps }}
				size="Normal"
				name={name}
				value={value}
				onChange={onChange}
				type={type}
				{...(error && { error: true, helperText: error })}
			/>
		</FormControl>
	);
}

export default Input;
