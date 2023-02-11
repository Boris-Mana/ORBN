import axios from 'axios';
import { tokenConfig } from './auth';
import { GET_ADVT_KINDS } from './types';

export const getAdvtKinds = () => (dispatch, getState) => {
    axios
        .get("/rest/api/objectKind/", tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_ADVT_KINDS,
                payload: res.data,
            });
        })
        .catch(err => console.log(err))
}