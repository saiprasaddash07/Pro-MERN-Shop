import * as constants from '../constants/orderConstants';
import axios from "axios";

import errorObject from "./error";

export const createOrder = (order) => async (dispatch,getState) => {
    try {
        dispatch({
            type: constants.ORDER_CREATE_REQUEST
        });

        const {user: {userInfo}} = getState();

        const config = {
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.post(`/api/orders`, order, config);

        dispatch({
            type: constants.ORDER_CREATE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch(errorObject(constants.ORDER_CREATE_FAIL,error));
    }
}

export const getOrderDetails = (id) => async (dispatch,getState) => {
    try {

        dispatch({
            type: constants.ORDER_DETAILS_REQUEST
        });

        const {user: {userInfo}} = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get(`/api/orders/${id}`, config);

        dispatch({
            type: constants.ORDER_DETAILS_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch(errorObject(constants.ORDER_DETAILS_FAIL,error));
    }
}

export const payOrder = (orderId,paymentResult) => async (dispatch,getState) => {
    try {
        dispatch({
            type: constants.ORDER_PAY_REQUEST
        });

        const {user: {userInfo}} = getState();

        const config = {
            headers: {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.put(`/api/orders/${orderId}/pay`,paymentResult, config);

        dispatch({
            type: constants.ORDER_PAY_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch(errorObject(constants.ORDER_PAY_FAIL,error));
    }
}

export const orderReset = () => (dispatch) => {
    dispatch({
        type: constants.ORDER_PAY_RESET,
    });
}

export const orderDeliverReset = () => (dispatch) => {
    dispatch({
        type: constants.ORDER_DELIVER_RESET,
    });
}

export const listMyOrders = () => async (dispatch,getState) => {
    try {
        dispatch({
            type: constants.ORDER_LIST_MY_REQUEST
        });

        const {user: {userInfo}} = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get(`/api/orders/myorders`, config);

        dispatch({
            type: constants.ORDER_LIST_MY_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch(errorObject(constants.ORDER_LIST_MY_FAIL,error));
    }
}

export const listOrders = () => async (dispatch,getState) => {
    try {
        dispatch({
            type: constants.ORDER_LIST_REQUEST
        });

        const {user: {userInfo}} = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get(`/api/orders`, config);

        dispatch({
            type: constants.ORDER_LIST_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch(errorObject(constants.ORDER_LIST_FAIL,error));
    }
}

export const deliverOrder = (order) => async (dispatch,getState) => {
    try {
        dispatch({
            type: constants.ORDER_DELIVER_REQUEST
        });

        const {user: {userInfo}} = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.put(`/api/orders/${order._id}/deliver`,{}, config);

        dispatch({
            type: constants.ORDER_DELIVER_SUCCESS,
            success : true
        });
    } catch (error) {
        dispatch(errorObject(constants.ORDER_DELIVER_FAIL,error));
    }
}