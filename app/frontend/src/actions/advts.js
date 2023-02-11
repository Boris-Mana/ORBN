import axios from 'axios';
import { tokenConfig } from './auth';
import { GET_ADVTS, GET_ADVT, SET_CURRENT_PAGE, CLEAR_ADVTS_FILTERS, UPDATE_ADVTS_FILTERS } from './types';
import { AdvtsGetParams } from "./models/advtsGetParams.js"

export const getAdvts = () => (dispatch, getState) => {
    let config = tokenConfig(getState);
    config.params = new URLSearchParams(getState().advts.advtsGetParams);
    axios
        .get("/rest/api/advts/", config)
        .then(res => {
            dispatch({
                type: GET_ADVTS,
                payload: res.data
            });
        })
        .catch(err => console.log(err))
}

export const getAdvt = (id) => (dispatch, getState) => {
    axios
        .get("/rest/api/advts/" + id, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_ADVT,
                payload: res.data,
            });
        })
        .catch(err => console.log(err))
}

export const setCurrentPage = page => (dispatch, getState) => {
    dispatch({
        type: SET_CURRENT_PAGE,
        payload: page,
    });
}

export const updateAdvtsFilters = (updated) => (dispatch, getState) => {
    dispatch({
        type: UPDATE_ADVTS_FILTERS,
        advtsGetParams: updated
    });
}

export const clearAdvtsFilters = () => (dispatch, getState) => {
    dispatch({
        type: CLEAR_ADVTS_FILTERS,
        payload: new AdvtsGetParams()
    });
}