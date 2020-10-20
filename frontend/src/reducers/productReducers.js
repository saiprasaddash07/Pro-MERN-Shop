import * as constants from '../constants/productConstants';

const initialState = {
    products: []
}

export const productListReducer = (state=initialState,action) => {
    switch (action.type){
        case constants.PRODUCT_LIST_REQUEST:
            return {
                ...state,
                products:[],
                loading:true
            }
        case constants.PRODUCT_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload
            }
        case constants.PRODUCT_LIST_FAIL:
            return {
                ...state,
                loading: false,
                error:action.payload
            }
        default:
            return state
    }
};

const secondInitState = {
    product : {
        reviews: []
    }
}

export const productDetailsReducer = (state=secondInitState,action) => {
    switch (action.type){
        case constants.PRODUCT_DETAILS_REQUEST:
            return {
                ...state,
                loading:true
            }
        case constants.PRODUCT_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                product: action.payload
            }
        case constants.PRODUCT_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error:action.payload
            }
        default:
            return state
    }
};
