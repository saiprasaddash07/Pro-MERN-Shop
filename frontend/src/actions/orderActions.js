import * as constants from '../constants/orderConstants';
import axios from "axios";

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
        dispatch({
            type: constants.ORDER_CREATE_FAIL,
            payload:
                error.response &&
                error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
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
        dispatch({
            type: constants.ORDER_DETAILS_FAIL,
            payload:
                error.response &&
                error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
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
        dispatch({
            type: constants.ORDER_PAY_FAIL,
            payload:
                error.response &&
                error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
}

export const orderReset = () => (dispatch) => {
    dispatch({
        type: constants.ORDER_PAY_RESET,
    });
}