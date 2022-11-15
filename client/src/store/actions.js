import { ADD_BOOK_TO_CART, LOGIN_BY_USER, REMOVE_BOOK_IN_CART, SELECT_ALL_BOOK_IN_CART, SELECT_CATEGORY, SELECT_CATEGORY_CHILD, UPDATE_BOOK_IN_CART } from "./constants";

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
export const loginByUser = payload =>({
    type: LOGIN_BY_USER,
    payload
})

export const selectCategory = payload =>({
    type: SELECT_CATEGORY,
    payload
})

export const selectCategoryChild = payload =>({
    type: SELECT_CATEGORY_CHILD,
    payload
})