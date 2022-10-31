import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { optionLimitRows } from '../../store'
function SelectNumberOfRows({ handleChange, numOfRows }) {
    let { label, options } = optionLimitRows;
    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue={options[0]}
                    value={numOfRows}
                    label="Age"
                    onChange={handleChange}
                >
                    {
                        options.map((option, index) =>
                            <MenuItem value={option} key={`option-rowPerPage-${index}`}>{option}</MenuItem>
                        )
                    }
                </Select>
            </FormControl>
        </Box >
    )
}

export default SelectNumberOfRows
