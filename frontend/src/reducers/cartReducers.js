import * as constants from '../constants/cartConstants';

const initialState = {
    cartItems : []
}

export const cartReducer = (state=initialState,action) => {
    switch(action.type){
        case constants.CART_ADD_ITEM :
            const item = action.payload; // here product refers to id which will be passed as payload
            const existItem = state.cartItems.find(x => x.product === item.product);

            if(existItem){
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.product === existItem.product ? item : x)
                }
            }else{
                return {
                    ...state,
                    cartItems : [...state.cartItems,item]
                };
            }
        case constants.CART_REMOVE_ITEM :
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== action.payload)
            }
        default:
            return state;
    }
}