import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//Check if there cart prducts in localstorage
const cartProductsInitialState = localStorage.getItem("cart-items")
  ? JSON.parse(localStorage.getItem("cart-items"))
  : [];

const loggedUserInitialState = localStorage.getItem("logged-user")
  ? JSON.parse(localStorage.getItem("logged-user"))
  : {};

const initialState = {
  shoppingCart: {
    cartProducts: cartProductsInitialState,
  },
  user: {
    loggedUser: loggedUserInitialState,
  },
};

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
