import { GET_ADVT_TYPES } from "../actions/types.js";

const initialState = {
    advtTypes: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ADVT_TYPES:
            return {
                ...state,
                advtTypes: action.payload,
            }
        default:
            return state;
    }
}