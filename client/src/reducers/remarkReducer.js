import { GET_REMARKS, GET_SPECIFIC_REMARK, ADD_REMARK, DELETE_REMARK, REMARKS_LOADING } from '../actions/types';

const initialState = {
    remarks: [],
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_REMARKS:
            return {
                ...state,
                remarks: action.payload,
                loading: false
            };
        case GET_SPECIFIC_REMARK:
            return {
                ...state,
                // remarks: state.remarks.find(remark => remark._id === action.payload),
                remarks: action.payload,
                loading: false
            };
        case DELETE_REMARK:
            return {
                ...state,
                remarks: state.remarks.filter(remark => remark._id !== action.payload)
            };
        case ADD_REMARK:
            return {
                ...state,
                remarks: [action.payload, ...state.remarks]
            };
        case REMARKS_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}