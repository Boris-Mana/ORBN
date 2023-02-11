import axios from 'axios';
import { tokenConfig } from './auth';
import { GET_LOCALITIES } from './types';

export const getLocalities = () => (dispatch, getState) => {
    axios
        .get("/rest/api/locality/", tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_LOCALITIES,
                payload: res.data,
            });
        })
        .catch(err => console.log(err))
}