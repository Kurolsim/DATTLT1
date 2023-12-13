import {configureStore} from "@reduxjs/toolkit";
import cartReducer from "./redux/CartReducer.js";
export default configureStore({
    reducer: {
        cart: cartReducer
    }
})