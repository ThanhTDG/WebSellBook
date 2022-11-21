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
		none = false,
		labelInside = false,
	} = props;

	return (
		<FormControl
			fullWidth
			className={className}
			size={size}
		>
			{labelInside ? <InputLabel>{label}</InputLabel> : <FormLabel>{label}</FormLabel>}
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
