import axios from 'axios';
import { GET_ENTRIES, ADD_ENTRIES, DELETE_ENTRIES, ENTRIES_LOADING, NO_ENTRIES, UPDATE_FAVORITES } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getEntries = id => (dispatch, getState) => {
    dispatch(setEntriesLoading())
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }
    axios
        .get(`/api/entry/${id}`, config)
        .then(res =>{
            dispatch({
                type: GET_ENTRIES,
                payload: res.data
            })
        })
        .catch(err => 
                dispatch({
                    type: NO_ENTRIES
                })
            )
}

export const addEntries = (id, entry) => (dispatch, getState) => {
    axios
        .post(`/api/entry/${id}`, entry, tokenConfig(getState))
        .then(res=>
            dispatch({
                type: ADD_ENTRIES,
                payload: res.data
                })
            )
            .catch(err =>
                dispatch(returnErrors(err.response.data, err.response.status))
                )
}

export const deleteEntries = (id, entry) => (dispatch, getState) => {
    const newConfig = Object.assign(tokenConfig(getState),{data: entry})
    axios
        .delete(`/api/entry/${id}`, newConfig)
        .then(res =>
            dispatch({
                type: DELETE_ENTRIES,
                payload: entry.entryID
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
            )
}

export const updateFavorites = (id, entry) => (dispatch, getState) => {
    axios
        .post(`/api/entry/${id}`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: UPDATE_FAVORITES,
                payload: res.data
            })
        })
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
            )
}

export const setEntriesLoading = () => {
    return {
      type: ENTRIES_LOADING
    };
  };