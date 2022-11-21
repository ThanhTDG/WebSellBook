.wrapper {
	width: 100%;
	max-height: min(calc(100vh - 96px), 734px);
	padding-top: 8px;
	background: white;
	box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 12px;
	border-radius: 8px;
}
                                                                                                                                                                                                                                                                                                                                     tProps.startAdornment = <InputAdornment position="start">{startAdornment}</InputAdornment>;
	}
	if (endAdornment) {
		inputProps.endAdornment = <InputAdornment position="end">{endAdornment}</InputAdornment>;
	}
	if (configNumber) {
		if (name === "height") {
			console.log("height", inputProps);
		}
		inputProps.inputProps = configNumber;
	}
	if (type === "number") {
		if (inputProps.inputProps) {
			inputProps.inputProps.style = { textAlign: "right" };
		}
	}

	return (
		<FormControl className={className} fullWidth={fullWidth}>
			<FormLabel id={name}>{label}</FormLabel>
			<TextField
				hiddenLabel
				variant="filled"
				sx={{ marginTop: 0 }}
				required={required}
				disabled={disabled}
				id={id}
				InputProps={{ ...inputProps }}
				name={name}
				value={value}
				onChange={onChange}
				type={type}
			/>
		</FormControl>
		// <TextField
		// 	fullWidth={fullWidth}
		// 	required={required}
		// 	disabled={disabled}
		// 	id={id}
		// 	InputProps={{ ...inputProps }}
		// 	label={label}
		// 	size="Normal"
		// 	name={name}
		// 	value={value}
		// 	onChange={onChange}
		// 	type={type}
		// 	{...(error && { error: true, helperText: error })}
		// />
	);
}

export default Input;
