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

const initState = {
    user : {}
}

export const userDetailsReducer = (state=initState,action) => {
    switch (action.type){
        case constants.USER_DETAILS_REQUEST:
            return {
                ...state,
                loading:true
            }
        case constants.USER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload
            }
        case constants.USER_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error:action.payload
            }
        case constants.USER_DETAILS_RESET:
            return {user:{}}
        default:
            return state
    }
};

export const userUpdateProfileReducer = (state={},action) => {
    switch (action.type){
        case constants.USER_UPDATE_PROFILE_REQUEST:
            return {
                ...state,
                loading:true
            }
        case constants.USER_UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                userInfo: action.payload,
                success : true
            }
        case constants.USER_UPDATE_PROFILE_FAIL:
            return {
                ...state,
                loading: false,
                error:action.payload
            }
        case constants.USER_UPDATE_PROFILE_RESET:
            return {}
        default:
            return state
    }
};

export const userListReducer = (state={users : []},action) => {
    switch (action.type){
        case constants.USER_LIST_REQUEST:
            return {
                ...state,
                loading:true
            }
        case constants.USER_LIST_SUCCESS:
            return {
                loading: false,
                users: action.payload
            }
        case constants.USER_LIST_FAIL:
            return {
                loading: false,
                error:action.payload
            }
        case constants.USER_LIST_RESET:
            return {
                users : []
            }
        default:
            return state
    }
};

export const userDeleteReducer = (state={},action) => {
    switch (action.type){
        case constants.USER_DELETE_REQUEST:
            return {
                loading:true
            }
        case constants.USER_DELETE_SUCCESS:
            return {
                loading: false,
                success : true
            }
        case constants.USER_DELETE_FAIL:
            return {
                loading: false,
                error:action.payload
            }
        default:
            return state
    }
};