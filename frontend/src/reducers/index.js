import { combineReducers } from "redux";
import { navBarReducer } from "./NavBarRecuers";
import {
  createProductsReducer,
  deleteProductReducer,
  getCategoriesReducer,
  getProductsByCategoryReducer,
  getLatestProductsReducer,
  getProductsDetails,
  productsToDeleteReducer,
} from "./productReducers";
import { userRegisterReducer, userLoginReducer } from "./userReducers";
import {
  orderPriceReducer,
  shippingDetailsReducer,
  createNewOrderReducer,
  orderDetailsReducer,
  currentUserOrdersReducer,
} from "./orderReducers";
import {
  getPublishableKeyReducer,
  getPaymentIntentReducer,
} from "./paymentReucers";

import { shoppingCartReducer } from "./shoppingCartReducer";
import {
  dashBoardOrdersReducer,
  dashBoardProductsReducer,
  dashBoardReducer,
  dashBoardUsersReducer,
} from "./dashBoardReducers";

const rootReducer = combineReducers({
  navBar: navBarReducer,
  categories: getCategoriesReducer,
  latestProducts: getLatestProductsReducer,
  getProductsByCategory: getProductsByCategoryReducer,
  productDetails: getProductsDetails,
  shoppingCart: shoppingCartReducer,
  registerUser: userRegisterReducer,
  user: userLoginReducer,
  orderPrices: orderPriceReducer,
  shippingDetails: shippingDetailsReducer,
  newOrder: createNewOrderReducer,
  orderDetails: orderDetailsReducer,
  currentUserOrders: currentUserOrdersReducer,
  stripekeys: getPublishableKeyReducer,
  stripePaymentIntent: getPaymentIntentReducer,
  darshBoardDetails: dashBoardReducer,
  dashBoardUsers: dashBoardUsersReducer,
  dashBoardProducts: dashBoardProductsReducer,
  dashBoardOrders: dashBoardOrdersReducer,
  createdProduct: createProductsReducer,
  productsToDelete: productsToDeleteReducer,
  deleteProducts: deleteProductReducer,
});

export default rootReducer;
