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
                products: action.payload.products,
                pages : action.payload.pages,
                page : action.payload.page
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

export const productDeleteReducer = (state= {},action) => {
    switch (action.type){
        case constants.PRODUCT_DELETE_REQUEST:
            return {
                loading:true
            }
        case constants.PRODUCT_DELETE_SUCCESS:
            return {
                loading: false,
                success : true
            }
        case constants.PRODUCT_DELETE_FAIL:
            return {
                ...state,
                loading: false,
                error:action.payload
            }
        default:
            return state
    }
};

export const productCreateReducer = (state= {},action) => {
    switch (action.type){
        case constants.PRODUCT_CREATE_REQUEST:
            return {
                loading:true
            }
        case constants.PRODUCT_CREATE_SUCCESS:
            return {
                loading: false,
                success : true,
                product : action.payload
            }
        case constants.PRODUCT_CREATE_FAIL:
            return {
                ...state,
                loading: false,
                error:action.payload
            }
        case constants.PRODUCT_CREATE_RESET:
            return {}
        default:
            return state
    }
};


export const productUpdateReducer = (state= {product : {}},action) => {
    switch (action.type){
        case constants.PRODUCT_UPDATE_REQUEST:
            return {
                loading:true
            }
        case constants.PRODUCT_UPDATE_SUCCESS:
            return {
                loading: false,
                success : true,
                product : action.payload
            }
        case constants.PRODUCT_UPDATE_FAIL:
            return {
                ...state,
                loading: false,
                error:action.payload
            }
        case constants.PRODUCT_UPDATE_RESET:
            return {
                product : {}
            }
        default:
            return state
    }
};

export const productReviewcreateReducer = (state= {},action) => {
    switch (action.type){
        case constants.PRODUCT_CREATE_REVIEW_REQUEST:
            return {
                loading:true
            }
        case constants.PRODUCT_CREATE_REVIEW_SUCCESS:
            return {
                loading: false,
                success : true,
            }
        case constants.PRODUCT_CREATE_REVIEW_FAIL:
            return {
                ...state,
                loading: false,
                error:action.payload
            }
        case constants.PRODUCT_CREATE_REVIEW_RESET:
            return {}
        default:
            return state
    }
};
