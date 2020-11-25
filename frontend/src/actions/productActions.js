import * as constants from '../constants/productConstants';
import axios from 'axios';

import errorObject from "./error";

export const listProducts = (keyword='',pageNumber = '') => async(dispatch) => {
    try{
        dispatch({
            type: constants.PRODUCT_LIST_REQUEST
        });
        const {data} = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`);
        dispatch({
            type: constants.PRODUCT_LIST_SUCCESS,
            payload:data
        });
    }catch (error) {
        dispatch(errorObject(constants.PRODUCT_LIST_FAIL,error));
    }
};

export const listProductDetails = (id) => async(dispatch) => {
    try{
        dispatch({
            type: constants.PRODUCT_DETAILS_REQUEST
        });
        const {data} = await axios.get(`/api/products/${id}`);
        dispatch({
            type: constants.PRODUCT_DETAILS_SUCCESS,
            payload:data
        });
    }catch (error) {
        dispatch(errorObject(constants.PRODUCT_DETAILS_FAIL,error));
    }
};

export const deleteProduct = (id) => async (dispatch,getState) => {
    try {
        dispatch({
            type: constants.PRODUCT_DELETE_REQUEST
        });

        const {user: {userInfo}} = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/api/products/${id}`, config);

        dispatch({
            type: constants.PRODUCT_DELETE_SUCCESS
        });
    } catch (error) {
        dispatch(errorObject(constants.PRODUCT_DELETE_FAIL,error));
    }
}

export const resettingProduct = () => (dispatch) => {
    dispatch({
        type: constants.PRODUCT_CREATE_RESET,
    });
}

export const createProduct = () => async (dispatch,getState) => {
    try {
        dispatch({
            type: constants.PRODUCT_CREATE_REQUEST
        });

        const {user: {userInfo}} = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} =  await axios.post(`/api/products`,{}, config);

        dispatch({
            type: constants.PRODUCT_CREATE_SUCCESS,
            payload:data
        });
    } catch (error) {
        dispatch(errorObject(constants.PRODUCT_CREATE_FAIL,error));
    }
}

export const resettingProductAfterUpdating = () => (dispatch) => {
    dispatch({
        type: constants.PRODUCT_UPDATE_RESET,
    });
}

export const updateProduct = (product) => async (dispatch,getState) => {
    try {
        dispatch({
            type: constants.PRODUCT_UPDATE_REQUEST
        });

        const {user: {userInfo}} = getState();

        const config = {
            headers: {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} =  await axios.put(`/api/products/${product._id}`,product, config);

        dispatch({
            type: constants.PRODUCT_UPDATE_SUCCESS,
            payload:data
        });
    } catch (error) {
        dispatch(errorObject(constants.PRODUCT_UPDATE_FAIL,error));
    }
}

export const resetProductReview = () => (dispatch) => {
    dispatch({
        type: constants.PRODUCT_CREATE_REVIEW_RESET,
    });
}

export const createProductReview = (productId,review) => async (dispatch,getState) => {
    try {
        dispatch({
            type: constants.PRODUCT_CREATE_REVIEW_REQUEST
        });

        const {user: {userInfo}} = getState();

        const config = {
            headers: {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.post(`/api/products/${productId}/reviews`,review, config);

        dispatch({
            type: constants.PRODUCT_CREATE_REVIEW_SUCCESS,
            success : true
        });
    } catch (error) {
        dispatch(errorObject(constants.PRODUCT_CREATE_REVIEW_FAIL,error));
    }
}

export const listTopProducts = () => async(dispatch) => {
    try{
        dispatch({
            type: constants.PRODUCT_TOP_REQUEST
        });
        const {data} = await axios.get(`/api/products/top`);
        dispatch({
            type: constants.PRODUCT_TOP_SUCCESS,
            payload:data
        });
    }catch (error) {
        dispatch(errorObject(constants.PRODUCT_TOP_FAIL,error));
    }
};
