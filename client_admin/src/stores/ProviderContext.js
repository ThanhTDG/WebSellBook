import { useReducer } from "react";

function ProviderContext(props) {
	const { children, Context, initState, reducer } = props;
	const [state, dispatch] = useReducer(reducer, initState);
	return <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>;
}

export default ProviderContext;
