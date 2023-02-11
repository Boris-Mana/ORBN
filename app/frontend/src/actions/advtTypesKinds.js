import axios from 'axios';
import { tokenConfig } from './auth';
import { GET_ADVT_TYPES_KINDS } from './types';

export const getAdvtTypesKinds = () => (dispatch, getState) => {
    axios
        .get("/rest/api/typesKinds/", tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_ADVT_TYPES_KINDS,
                payload: res.data,
            });
        })
        .catch(err => console.log(err))
}