import axios from 'axios';
import { tokenConfig } from './auth';
import { GET_ADVT_TYPES } from './types';

export const getAdvtTypes = () => (dispatch, getState) => {
    axios
        .get("/rest/api/objectType/", tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_ADVT_TYPES,
                payload: res.data,
            });
        })
        .catch(err => console.log(err))
}