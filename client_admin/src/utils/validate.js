import BookConfig from "~/stores/Book";
import validator from "validator";
export const bookValidation = (fieldValues, errors, setError) => {
	let object = BookConfig.props;
	let temp = { ...errors };

	if ("name" in fieldValues) {
		let isEmpty = validator.isEmpty(fieldValues["name"]);
		if (object["name"].require === true && isEmpty === true) {
			temp["name"] = "Đây là trường bắt buộc";
		} else {
			temp["name"] = "";
		}
	}
	if ("originalPrice" in fieldValues) {
		let isEmpty = validator.isEmpty(fieldValues["originalPrice"]);
		if (object["originalPrice"].require === true && isEmpty === true) {
			temp["originalPrice"] = "Đây là trường bắt buộc";
		} else {
			temp["originalPrice"] = "";
		}
	}
	setError({
		...temp,
	});
	if (false) return Object.values(temp).every((x) => (x = ""));
};

const validate = {
	book: bookValidation,
};

export default validate;
