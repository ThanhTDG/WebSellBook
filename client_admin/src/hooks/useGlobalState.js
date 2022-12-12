import { useContext } from "react";
export const useGlobalState = (Context) => {
	const [state, dispatch] = useContext(Context);
	return [state, dispatch];
};
