import { fontSize as fontSizes } from "@mui/system";

const fontSizes = {
	xSmall: 12,
	small: 14,
	medium: 16,
	large: 24,
	xLarge: 32,
};

const fontWeights = {
	italic: 300,
	normal: 500,
	bold: 700,
};
const setSize = ({ fontWeight = fontWeights.normal, type = "medium" }) => {
	let fontTitle = {};

	Object.keys(fontSizes).forEach((key) => {
		fontTitle[key].fontSize = fontSizes[key];
		fontTitle[key].fontWeight = fontWeight;
	});
	return fontTitle[type];
};

export { fontSizes, title, fontWeight };
