import { GET_LOCALITIES } from "../actions/types.js";

const initialState = {
    localities: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_LOCALITIES:
            return {
                ...state,
                localities: action.payload,
            }
        default:
            return state;
    }
}