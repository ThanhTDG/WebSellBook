import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function LocationProviderMui(props) {
	return <LocalizationProvider dateAdapter={AdapterDayjs}>{props.children}</LocalizationProvider>;
}

export default LocationProviderMui;
