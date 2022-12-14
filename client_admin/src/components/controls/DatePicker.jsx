import React from "react";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import dayjs from "dayjs";
import { useEffect } from "react";
import LocationProviderMui from "./LocationProviderMui";
function DatePicker(props) {
	const { name, className = null, label, value, onChange, fullWidth = true } = props;
	const convertDayjs = (value) => {
		if (value && typeof value === "string") {
			return dayjs(value);
		}
		return null;
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
				className={className}
				name={name}
				label={label}
				inputFormat="DD/MM/YYYY"
				value={convertDayjs(value)}
				onChange={(value) => onChange(convertDefPara(name, value.toISOString()))}
				renderInput={(params) => (
					<TextField
						fullWidth={fullWidth}
						{...params}
					/>
				)}
			/>
		</LocationProviderMui>
	);
}

export default DatePicker;
