import { FormControl, InputLabel, MenuItem, Select as MuiSelect } from "@mui/material";
import React from "react";

function Select({ label, value, name, onChance, options, none = false }) {
	return (
		<FormControl>
			<InputLabel>{label}</InputLabel>
			<MuiSelect label={label} name={name} value={value} onChange={onChance}>
				{none && <MenuItem value="">None</MenuItem>}
				{options.map((item) => (
					<MenuItem key={item.id} value={item.id}>
						{item.title}
					</MenuItem>
				))}
			</MuiSelect>
		</FormControl>
	);
}

export default Select;
