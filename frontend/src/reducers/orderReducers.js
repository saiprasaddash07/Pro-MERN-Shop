import * as constants from '../constants/orderConstants';

export const orderCreateReducer = (state = {},action) => {
    switch(action.type) {
        case constants.ORDER_CREATE_REQUEST :
            return {
                ...state,
                loading: true
            }
        case constants.ORDER_CREATE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                order: action.payload
            }
        case constants.ORDER_CREATE_FAIL :
            return {
                ...state,
                loading:false,
                error:action.payload
            }
        default:
            return state
    }
}

const initialState = {
    orderItems : [],
    shippingAddress : {},
    loading:true
}

export const orderDetailsReducer = (state = initialState,action) => {
    switch(action.type) {
        case constants.ORDER_DETAILS_REQUEST :
            return {
                loading: true
            }
        case constants.ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }
        case constants.ORDER_DETAILS_FAIL :
            return {
                loading:false,
                error:action.payload
            }
        default:
            return state
    }
}

export const orderPayReducer = (state = {},action) => {
    switch(action.type) {
        case constants.ORDER_PAY_REQUEST :
            return {
                loading: true
            }
        case constants.ORDER_PAY_SUCCESS:
            return {
                loading: false,
                success : true
            }
        case constants.ORDER_PAY_FAIL :
            return {
                loading:false,
                error:action.payload
            }
        case constants.ORDER_PAY_RESET :
            return {}
        default:
            return state
    }
}