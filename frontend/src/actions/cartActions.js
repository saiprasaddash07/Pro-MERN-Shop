import axios from 'axios';
import * as constants from '../constants/cartConstants';

export const addToCart = (id,qty) => async (dispatch,getState) => {
    const {data} = await axios.get(`/api/products/${id}`);


    dispatch({
        type: constants.CART_ADD_ITEM,
        payload:{
            product : data._id,
            name : data.name,
            image : data.image,
            price : data.price,
            countInStock : data.countInStock,
            qty
        }
    });

    console.log(JSON.stringify(getState().cart.cartItems));

    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems));

};

export const removeFromCart = (id) => (dispatch,getState) => {

    dispatch({
        type: constants.CART_REMOVE_ITEM,
        payload : id
    });
    console.log(JSON.stringify(getState().cart.cartItems));
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems));
}

