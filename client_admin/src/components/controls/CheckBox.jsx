import { FormControl, FormControlLabel, Checkbox as MuiCheckBox } from "@mui/material";
import React from "react";

function CheckBox(props) {
	const { name, label, value, onChange } = props;
	const convertToDefEventPara = (name, value) => ({
		target: {
			name,
			value,
		},
	});
	return (
		<FormControl>
			<FormControlLabel
				control={
					<MuiCheckBox
						name={name}
						color="primary"
						checked={value}
						onChange={(e) => onChange(convertToDefEventPara(name, e.target.checked))}
					/>
				}
				label={label}
			/>
		</FormControl>
	);
}

export default CheckBox;
