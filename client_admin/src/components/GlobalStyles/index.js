import "./globalStyles.scss";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import themeMui from "~/config/themes";

function GlobalStyles({ children }) {
	return <ThemeProvider theme={themeMui}>{children}</ThemeProvider>;
}

export default GlobalStyles;
