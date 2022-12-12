import React from "react";
import ReactDOM from "react-dom/client";
import GlobalStyles from "~/components/GlobalStyles";
import App from "./App";
import { globalContext } from "./stores/Context";
import { globalState as initGlobalState } from "./stores/initStates";
import ProviderContext from "./stores/ProviderContext";
import { globalStateReducer } from "./stores/Reducer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<GlobalStyles>
		<ProviderContext
			initState={initGlobalState}
			reducer={globalStateReducer}
			Context={globalContext}
		>
			<App />
		</ProviderContext>
	</GlobalStyles>
);
