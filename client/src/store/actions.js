import { ADD_BOOK_TO_CART, REMOVE_BOOK_IN_CART, SELECT_ALL_BOOK_IN_CART, UPDATE_BOOK_IN_CART } from "./constants";

export const addBookToCart = payload =>({
    type: ADD_BOOK_TO_CART,
    payload
})

export const selectAllBookInCart = payload =>({
    type: SELECT_ALL_BOOK_IN_CART,
    payload
})

export const updateBookInCart = payload =>({
    type: UPDATE_BOOK_IN_CART,
    payload
})
export const removeBookInCart = payload =>({
    type: REMOVE_BOOK_IN_CART,
    payload
})