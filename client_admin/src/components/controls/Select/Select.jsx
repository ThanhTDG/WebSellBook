import { FormControl, FormLabel, InputLabel, Select as SelectMui, MenuItem } from "@mui/material";
import React from "react";

function Select(props) {
	const {
		name,
		size = "normal",
		className = null,
		label,
		value,
		onChange,
		items,
		variant = null,
		none = false,
		labelInside = false,
	} = props;

	return (
		<FormControl
			variant={variant}
			sx={{ m: 1, minWidth: 120 }}
			fullWidth
			className={className}
			size={size}
		>
			{labelInside && variant ? <InputLabel>{label}</InputLabel> : <FormLabel>{label}</FormLabel>}
			<SelectMui
				name={name}
				value={value}
				onChange={onChange}
			>
				{none && <MenuItem value="">None</MenuItem>}
				{items.map((item) => {
					let id = item;
					let name = item;
					if (item.id) {
						id = item.id;
						name = item.name;
					}
					return (
						<MenuItem
							key={id}
							value={id}
						>
							{name}
						</MenuItem>
					);
				})}
			</SelectMui>
		</FormControl>
	);
}

export default Select;
