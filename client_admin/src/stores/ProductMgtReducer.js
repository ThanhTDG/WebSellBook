import { SET_TAB_MGT_PRODUCT, SET_LIMIT_ROWS, SET_PAGE_MGT_PRODUCT } from './constants'

const initState = {
    selectTab: 0,
    tab: "",
    limitRows: 0,
    search: "",
    page: 1,
    maxPage: 10,
}
function Reducer(state, action) {
    switch (action.type) {
        case SET_TAB_MGT_PRODUCT:
            return {
                ...state,
                selectTab: action.payload,
            }
        case SET_LIMIT_ROWS:
            return {
                ...state,
                limitRows: action.payload,
            }
        case SET_PAGE_MGT_PRODUCT:
            return {
                ...state,
                page: action.payload,
            }
        default:
            throw new Error('Invalid action')
    }
}

export { initState }
export default Reducer