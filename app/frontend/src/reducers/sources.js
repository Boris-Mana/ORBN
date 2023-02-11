import { GET_SOURCES } from "../actions/types.js";

const initialState = {
    sources: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_SOURCES:
            return {
                ...state,
                sources: action.payload,
            }
        default:
            return state;
    }
}