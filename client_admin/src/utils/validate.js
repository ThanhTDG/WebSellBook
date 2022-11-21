import validator from "validator";
const validate = {
	book: "bookValidation",
};

// const bookValidation = ({ fieldValues, errors, setError, all = false }) => {
// 	let object = BookConfig;
// 	let temp = { ...errors };
// 	if ("name" in fieldValues) {
// 		let notValid = require(BookConfig, fieldValues.value);
// 		if (notValid) {
// 			temp.name = notValid;
// 		} else {
// 			let length = {
// 				min: 0,
// 				max: undefined,
// 			};
// 			let valid = validator.isByteLength(value, length);
// 			if (valid) temp.name = "";
// 			else {
// 			}
// 		}
// 	}
// 	setError({
// 		...temp,
// 	});
// 	if (all) return Object.values(temp).every((x) => (x = ""));
// };
// const require = (object, value) => {
// 	if (object.isRequire) {
// 		if (validator.isEmpty(value)) return "Đây là trường bắt buộc";
// 	}
// };

export default validate;
