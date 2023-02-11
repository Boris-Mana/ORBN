import { GET_ADVT_TYPES_KINDS } from "../actions/types.js";

const initialState = {
    advtTypesKinds: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ADVT_TYPES_KINDS:
            return {
                ...state,
                advtTypesKinds: action.payload,
            }
        default:
            return state;
    }
}