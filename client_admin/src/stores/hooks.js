import Context from './ProductMgtContext';
import { useContext } from 'react';

export const useProductMgt = () => {
    const [state, dispatch] = useContext(Context);
    return [state, dispatch];
}