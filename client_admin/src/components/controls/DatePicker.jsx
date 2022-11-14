import React from "react";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import dayjs from "dayjs";
import { useEffect } from "react";
import LocationProviderMui from "./LocationProviderMui";
function DatePicker(props) {
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
			<DesktopDatePicker
				name={name}
				label={label}
				value={convertDayjs(value)}
				onChange={(value) => onChange(convertDefPara(name, value.toISOString()))}
				renderInput={(params) => <TextField {...params} />}
			/>
		</LocationProviderMui>
	);
}

export default DatePicker;
