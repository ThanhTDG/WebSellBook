import React, { useState } from "react";

function useForm(initialValues, validateOnChange = false, validate) {
	const [values, setValues] = useState(initialValues);
	const [errors, setError] = useState({});
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value,
		});
		if (validateOnChange) {
			validate({ [name]: value },errors,setError);
		}
	};
	return {
		values,
		setValues,
		errors,
		setError,
		handleInputChange,
	};
}

export default useForm;
