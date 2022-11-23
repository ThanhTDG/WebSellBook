import React from "react";
import { DateTimePicker as MuiDateTimePicker } from "@mui/x-date-pickers";
function DateTimePicker() {
	const { name, label, value, onChange } = props;
	const convertDayjs = (value) => {
		if (typeof value === "string") {
			return dayjs(value);
		}
		return dayjs();
	};
	const convertDefPara = (name, value) => ({
		target: {
			name,
			value,
		},
	});
	return (
		<LocationProviderMui>
			<MuiDateTimePicker
				name={name}
				label={label}
				value={convertDayjs(value)}
				onChange={(value) => onChange(convertDefPara(name, value.toISOString()))}
				renderInput={(params) => <TextField {...params} />}
			/>
		</LocationProviderMui>
	);
}

export default DateTimePicker;
