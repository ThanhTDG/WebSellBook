import { SET_TAB_MGT_PRODUCT, SET_PAGE_MGT_PRODUCT, SET_LIMIT_ROWS } from './constants'

export const setTabMgtProduct = payload => ({
    type: SET_TAB_MGT_PRODUCT,
    payload
});

export const setPageMgtProduct = payload => ({
    type: SET_PAGE_MGT_PRODUCT,
    payload
});

export const setCountRowOnPageMgtProduct = payload => ({
    type: SET_LIMIT_ROWS,
    payload
});