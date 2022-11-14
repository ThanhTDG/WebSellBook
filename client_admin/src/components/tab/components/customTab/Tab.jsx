import React from 'react';
import Tab from '@mui/material/Tab';
function Tab({ size = "medium", label, key ,custom}) {



    return (
        < Tab sx={{ fontSize: 16, fontWeight: 700 }} key={key} label={label} />
    )
}

export default Tab