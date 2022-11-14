import React from "react";
import { LocalizationProvider, AdapterMoment, DateTimePicker } from "@mui/x-date-pickers";

function DatePicker(props) {
	const { name, label, value, handleChange } = props;
	return (
		<LocalizationProvider dateAdapter={AdapterMoment}>
			<DateTimePicker
				name={name}
				label={label}
				value={value}
				onChange={handleChange}
				renderInput={(params) => <TextField {...params} />}
			/>
		</LocalizationProvider>
	);
}

export default DatePicker;
