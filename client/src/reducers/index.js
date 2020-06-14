import { combineReducers } from 'redux';
import projectReducer from './projectReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import remarkReducer from './remarkReducer';

export default combineReducers({
    project: projectReducer,
    error: errorReducer,
    auth: authReducer,
    remark: remarkReducer
});