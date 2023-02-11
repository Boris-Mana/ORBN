import axios from 'axios';
import { tokenConfig } from './auth';
import { GET_SOURCES } from './types';

export const getSources = () => (dispatch, getState) => {
    axios
        .get("/rest/api/source/", tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_SOURCES,
                payload: res.data,
            });
        })
        .catch(err => console.log(err))
}