import { FormControl, FormLabel, FormControlLabel, Radio, RadioGroup as MuiRadioGroup } from "@mui/material";
import React from "react";

function RadioGroup(props) {
	const { name, label, value, onChange, items, children } = props;
	return (
		<FormControl>
			<FormLabel>{label}</FormLabel>
			<MuiRadioGroup row name={name} value={value} onChange={onChange}>
				{items.map((item) => {
					return <FormControlLabel key={item.id} value={item.id} control={<Radio />} label={item.name} />;
				})}
			</MuiRadioGroup>
			{children}
		</FormControl>
	);
}

export default RadioGroup;
