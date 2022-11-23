import React from "react";
import { DialogTitle, Dialog as MuiDialog, DialogContent } from "@mui/material";
import "./dialog.scss";
function Dialog(props) {
	const { open, setOpen, children } = props;

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<MuiDialog fullWidth={true} open={open} onClose={handleClose}>
			<DialogTitle>Set backup account</DialogTitle>
			<DialogContent>{children}</DialogContent>
		</MuiDialog>
	);
}

export default Dialog;
