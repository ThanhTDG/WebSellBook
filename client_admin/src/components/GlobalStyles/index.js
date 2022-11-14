import "./globalStyles.scss";
import { ThemeProvider, createTheme, responsiveFontSizes } from "@material-ui/core/styles";
const theme = createTheme({
	typography: {
		fontFamily: ["Roboto", "sans-serif"].join(","),
		htmlFontSize: 16,
		fontSize: 50,
		fontWeightLight: 500,
	},

	components: {
		MuiCssBaseline: {
			styleOverrides: `
			@font-face {
			  font-family: 'Roboto';
			  font-style: normal;
			  font-display: swap;
			  font-weight: 500;
			  unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
			}
		  `,
		},
	},
});

function GlobalStyles({ children }) {
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default GlobalStyles;
