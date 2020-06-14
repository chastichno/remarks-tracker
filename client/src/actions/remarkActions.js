import axios from 'axios';
import { GET_REMARKS, GET_SPECIFIC_REMARK, ADD_REMARK, DELETE_REMARK, REMARKS_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getRemarks = () => (dispatch, getState) => {
    dispatch(setRemarksLoading());
    axios
        .get('/api/remarks')
        .then(res =>
            dispatch({
                type: GET_REMARKS,
                payload: res.data
            })
        )
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};



export const addRemark = remark => (dispatch, getState) => {
    axios
        .post('/api/remarks', remark, tokenConfig(getState))
        // .post('/api/remarks', remark)

        .then(res =>
            dispatch({
                type: ADD_REMARK,
                payload: res.data
            })
        )
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const deleteRemark = (id) => (dispatch, getState) => {
    axios
        .delete(`/api/remarks/${id}`, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: DELETE_REMARK,
                payload: id
            })
        )
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const getSpecificRemark = (id) => (dispatch, getState) => {
    dispatch(setRemarksLoading());
    axios
        .get(`/api/remarks/${id}`)
        .then(res =>
            dispatch({
                type: GET_SPECIFIC_REMARK,
                payload: res.data
            })
        )
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};


export const setRemarksLoading = () => {
    return {
        type: REMARKS_LOADING
    }
};