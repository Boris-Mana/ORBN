import { GET_ADVTS, GET_ADVT, SET_CURRENT_PAGE, CLEAR_ADVTS_FILTERS, UPDATE_ADVTS_FILTERS } from "../actions/types.js";
import { AdvtsGetParams } from "../actions/models/advtsGetParams.js"

const initialState = {
    advts: [],
    advt: undefined,
    currentPage: 0,
    perPage: 25,
    totalCount: 0,
    advtsGetParams: new AdvtsGetParams()
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ADVTS:
            return {
                ...state,
                advts: action.payload.results,
                totalCount: action.payload.count
            }
        case GET_ADVT:
            return {
                ...state,
                advt: action.payload
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload
            }
        case CLEAR_ADVTS_FILTERS:
            return {
                ...state,
                advtsGetParams: action.payload
            }
        case UPDATE_ADVTS_FILTERS:
            return {
                ...state
            }
        default:
            return state;
    }
}