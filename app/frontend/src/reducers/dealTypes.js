import { GET_DEAL_TYPES } from "../actions/types.js";

const initialState = {
    dealTypes: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_DEAL_TYPES:
            return {
                ...state,
                dealTypes: action.payload,
            }
        default:
            return state;
    }
}