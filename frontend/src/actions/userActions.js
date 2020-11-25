import * as constants from "../constants/userConstants";
import {ORDER_LIST_MY_RESET} from '../constants/orderConstants';
import axios from 'axios';
import errorObject from "./error";

export const login = (email,password) => async (dispatch) => {
    try{
        dispatch({
            type: constants.USER_LOGIN_REQUEST
        });

        const config = {
            headers : {
                "Content-Type" : 'application/json'
            }
        }

        const {data} = await axios.post('/api/users/login',{email,password},config);

        dispatch({
            type: constants.USER_LOGIN_SUCCESS,
            payload:data
        });

        localStorage.setItem('userInfo',JSON.stringify(data));
    }catch (error) {
        dispatch(errorObject(constants.USER_LOGIN_FAIL,error));
    }
}

export const updateUserReset = () => (dispatch) => {
    dispatch({
        type: constants.USER_UPDATE_RESET,
    });
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({
        type: constants.USER_LOGOUT
    });
    dispatch({
        type: constants.USER_DETAILS_RESET
    });
    dispatch({
        type: ORDER_LIST_MY_RESET
    });
    dispatch({
        type: constants.USER_LIST_RESET
    })
}

export const register = (name,email,password) => async (dispatch) => {
    try{
        dispatch({
            type: constants.USER_REGISTER_REQUEST
        });

        const config = {
            headers : {
                "Content-Type" : 'application/json'
            }
        }

        const {data} = await axios.post('/api/users',{name,email,password},config);

        dispatch({
            type: constants.USER_REGISTER_SUCCESS,
            payload:data
        });

        dispatch({
            type: constants.USER_LOGIN_SUCCESS,
            payload:data
        });

        localStorage.setItem('userInfo',JSON.stringify(data));
    }catch (error) {
        dispatch(errorObject(constants.USER_REGISTER_FAIL,error));
    }
}

export const getUserDetails = (id) => async (dispatch,getState) => {
    try {
        dispatch({
            type: constants.USER_DETAILS_REQUEST
        });

        const {user : { userInfo }} = getState();

        const config = {
            headers: {
                "Content-Type": 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        console.log(id);

        const {data} = await axios.get(`/api/users/${id}`, config);

        console.log(data);

        dispatch({
            type: constants.USER_DETAILS_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch(errorObject(constants.USER_DETAILS_FAIL,error));
    }
}

export const updateUserDetails = (user) => async (dispatch,getState) => {
    try {
        dispatch({
            type: constants.USER_UPDATE_PROFILE_REQUEST
        });

        const {user : { userInfo }} = getState();

        const config = {
            headers: {
                "Content-Type": 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.put(`/api/users/profile`,user, config);

        console.log(data);

        dispatch({
            type: constants.USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        });

        dispatch({
            type: constants.USER_LOGIN_SUCCESS,
            payload: data
        });

        localStorage.setItem('userInfo',JSON.stringify(data));
    } catch (error) {
        dispatch(errorObject(constants.USER_UPDATE_PROFILE_FAIL,error));
    }
}

export const listUsers = () => async (dispatch,getState) => {
    try {
        dispatch({
            type: constants.USER_LIST_REQUEST
        });

        const {user : { userInfo }} = getState();

        const config = {
            headers: {
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get(`/api/users`, config);

        dispatch({
            type: constants.USER_LIST_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch(errorObject(constants.USER_LIST_FAIL,error));
    }
}

export const deleteUser = (id) => async (dispatch,getState) => {
    try {
        dispatch({
            type: constants.USER_DELETE_REQUEST
        });

        const {user : { userInfo }} = getState();

        const config = {
            headers: {
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/api/users/${id}`, config);

        dispatch({
            type: constants.USER_DELETE_SUCCESS
        });
    } catch (error) {
        dispatch(errorObject(constants.USER_DELETE_FAIL,error));
    }
}



export const updateUser = (userObject) => async (dispatch,getState) => {
    try {
        dispatch({
            type: constants.USER_UPDATE_REQUEST
        });

        const {user : { userInfo }} = getState();

        const config = {
            headers: {
                "Content-Type": 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.put(`/api/users/${userObject._id}`,userObject, config);

        dispatch({
            type: constants.USER_UPDATE_SUCCESS
        });

        dispatch({
            type : constants.USER_DETAILS_SUCCESS,
            payload : data
        })

    } catch (error) {
        dispatch(errorObject(constants.USER_UPDATE_FAIL,error));
    }
}