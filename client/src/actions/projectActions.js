import axios from 'axios';
import { GET_PROJECTS, GET_SPECIFIC_PROJECT, ADD_PROJECT, DELETE_PROJECT, PROJECTS_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getProjects = () => (dispatch, getState) => {
    dispatch(setProjectsLoading());
    axios
        .get('/api/projects')
        .then(res =>
            dispatch({
                type: GET_PROJECTS,
                payload: res.data
            })
        )
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};



export const addProject = project => (dispatch, getState) => {
    axios
        .post('/api/projects', project, tokenConfig(getState))
        // .post('/api/projects', project)

        .then(res =>
            dispatch({
                type: ADD_PROJECT,
                payload: res.data
            })
        )
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const deleteProject = (id) => (dispatch, getState) => {
    axios
        .delete(`/api/projects/${id}`, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: DELETE_PROJECT,
                payload: id
            })
        )
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const getSpecificProject = (id) => (dispatch, getState) => {
    dispatch(setProjectsLoading());
    axios
        .get(`/api/projects/${id}`)
        .then(res =>
            dispatch({
                type: GET_SPECIFIC_PROJECT,
                payload: res.data
            })
        )
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};


export const setProjectsLoading = () => {
    return {
        type: PROJECTS_LOADING
    }
};