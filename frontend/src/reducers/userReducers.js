import * as constants from '../constants/userConstants';

const initialState = {}

export const userLoginReducer = (state=initialState,action) => {
    switch (action.type){
        case constants.USER_LOGIN_REQUEST:
            return {
                ...state,
                loading:true
            }
        case constants.USER_LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                userInfo: action.payload
            }
        case constants.USER_LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                error:action.payload
            }
        case constants.USER_LOGOUT :
            return {}
        default:
            return state
    }
};

export const userRegisterReducer = (state=initialState,action) => {
    switch (action.type){
        case constants.USER_REGISTER_REQUEST:
            return {
                ...state,
                loading:true
            }
        case constants.USER_REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                userInfo: action.payload
            }
        case constants.USER_REGISTER_FAIL:
            return {
                ...state,
                loading: false,
                error:action.payload
            }
        default:
            return state
    }
};