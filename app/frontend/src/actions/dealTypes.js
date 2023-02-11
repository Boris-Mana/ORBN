import axios from 'axios';
import { tokenConfig } from './auth';
import { GET_DEAL_TYPES } from './types';

export const getDealTypes = () => (dispatch, getState) => {
    axios
        .get("/rest/api/dealType/", tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_DEAL_TYPES,
                payload: res.data,
            });
        })
        .catch(err => console.log(err))
}