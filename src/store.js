import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import counterReducer from "./reducers/counterReducer";
import {
    productListReducer,
    productDetailsReducer,
    productDeleteReducer,
    productCreateReducer,
    productUpdateReducer,
    productReviewCreateReducer,
    productTopRatedReducer,
} from './reducers/productReducer'
import { cartReducer } from './reducers/cartReducer'
const reducer = combineReducers({
    counter: counterReducer,
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productReviewCreate: productReviewCreateReducer,
    productTopRated: productTopRatedReducer,
    cart: cartReducer,
});
const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) :
    []

// const userInfoFromStorage = localStorage.getItem('userInfo')
//   ? JSON.parse(localStorage.getItem('userInfo'))
//   : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('shippingAddress')) :
    {}

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
    },
    //   userLogin: { userInfo: userInfoFromStorage },
}



const store = createStore(
    reducer,
    initialState,
    applyMiddleware(thunk)
)

export default store