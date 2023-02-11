import axios from 'axios';
import { tokenConfig } from './auth';
import { GET_REGIONS } from './types';

export const getRegions = () => (dispatch, getState) => {
    axios
        .get("/rest/api/region/", tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_REGIONS,
                payload: res.data,
            });
        })
        .catch(err => console.log(err))
}