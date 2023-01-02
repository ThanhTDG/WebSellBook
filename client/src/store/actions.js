import { ADD_BOOK_TO_CART, BOOKS_NAVIGATION_BUTTONS, GET_USER_PROFILE, LOGIN_BY_USER, LOGOUT_USER, NEED_UPDATE_FAVORITE_BOOKS, REMOVE_BOOK_IN_CART, SELECT_ALL_BOOK_IN_CART, SELECT_BOOKS_NAVIGATION_BUTTON, SELECT_CATEGORY, SELECT_CATEGORY_CHILD, SELEECT_BOOK_SORT_TYPE, SELEECT_USER_TB_INDEX, UPDATE_BOOK_IN_CART, UPDATE_TOTAL_BOOKS_IN_CART } from "./constants";

export const addBookToCart = payload => ({
    type: ADD_BOOK_TO_CART,
    payload
})

export const selectAllBookInCart = payload => ({
    type: SELECT_ALL_BOOK_IN_CART,
    payload
})

export const updateBookInCart = payload => ({
    type: UPDATE_BOOK_IN_CART,
    payload
})
export const removeBookInCart = payload => ({
    type: REMOVE_BOOK_IN_CART,
    payload
})
export const loginByUser = payload => ({
    type: LOGIN_BY_USER,
    payload
})

export const selectCategory = payload => ({
    type: SELECT_CATEGORY,
    payload
})

export const selectCategoryChild = payload => ({
    type: SELECT_CATEGORY_CHILD,
    payload
})

export const booksNavButtons = payload => ({
    type: BOOKS_NAVIGATION_BUTTONS,
    payload
})

export const selectBooksNavigationButton = payload => ({
    type: SELECT_BOOKS_NAVIGATION_BUTTON,
    payload
})

export const setUserProfile = payload => ({
    type: GET_USER_PROFILE,
    payload
})

export const logoutUser = payload => ({
    type: LOGOUT_USER,
    payload
})

export const selectUserTbIndex = payload => ({
    type: SELEECT_USER_TB_INDEX,
    payload
})

export const selectBookSortTyle = payload => ({
    type: SELEECT_BOOK_SORT_TYPE,
    payload
})

export const updateTotalBookInCart = payload =>({
    type: UPDATE_TOTAL_BOOKS_IN_CART,
    payload
})

export const needUpdateFavoriteBooks = payload=>({
    type: NEED_UPDATE_FAVORITE_BOOKS,
    payload
})