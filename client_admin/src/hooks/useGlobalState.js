import { useContext } from "react";
import { globalContext } from "~/stores/contexts";
export const useGlobalState = () => {
	const [state, dispatch] = useContext(globalContext);
	return [state, dispatch];
};
