import Context from './ProductMgtContext';
import { useReducer } from 'react';
import reducer, { initState } from './ProductMgtReducer'


function Provider({ children }) {
    const [state, dispatch] = useReducer(reducer, initState)
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
}

export default Provider