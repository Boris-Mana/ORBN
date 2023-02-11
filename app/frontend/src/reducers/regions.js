import { GET_REGIONS } from "../actions/types.js";

const initialState = {
    regions: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_REGIONS:
            return {
                ...state,
                regions: action.payload,
            }
        default:
            return state;
    }
}