import React from "react";
import { Form, TextArea as SemanticTextArea } from "semantic-ui-react";
import "./textArea.scss";
function Textarea(props) {
	const { name, label, style = {}, disable = false, minRows = 10, maxRows = 20, value, onChange, desc = null } = props;
	return (
		<Form>
			<SemanticTextArea
				style={style}
				disable={disable}
				name={name}
				aria-label={label}
				rows={maxRows}
				placeholder={desc}
				value={value}
				onChange={onChange}
			/>
		</Form>
	);
}

export default Textarea;
