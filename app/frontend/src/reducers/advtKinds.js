import { GET_ADVT_KINDS } from "../actions/types.js";

const initialState = {
    advtKinds: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ADVT_KINDS:
            return {
                ...state,
                advtKinds: action.payload,
            }
        default:
            return state;
    }
}