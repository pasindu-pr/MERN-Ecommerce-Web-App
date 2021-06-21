import React from "react";
import GlobalStyles from "./GlobalStyle/globalStyle";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import styled from "styled-components";
import "semantic-ui-css/semantic.min.css";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import ProductsByCategoriesScreen from "./screens/ProductsCategoriesScreen";
import ShoppingCartScreen from "./screens/ShoppingCartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingScreen from "./screens/ShippingScreen";
import CheckoutScreen from "./screens/CheckoutScreen";
import UserAccountScreen from "./screens/UserAccountScreen";
import OrderScreen from "./screens/OrderScreen";
import PaymentScreen from "./wrapper/PaymentScreenWrapComponent";
import DashBoardScreen from "./screens/DashBoardScreen";
import OrderManageScreen from "./screens/OrderManageScreen";
import UserManagerScreen from "./screens/UserManagementScreen";
import ProductsManagerScreen from "./screens/ProductsManagementScreen";
import CreateProductScreen from "./screens/CreateProductScreen";
import PasswordResetRequestScreen from "./screens/PasswordResetRequestScreen";
import PasswordResetScreen from "./screens/PasswordResetScreen";

import { ToastContainer, Zoom } from "react-toastify";
import DashBoardCategoriesScreen from "./screens/DashBoardCategoriesScreen";

function App() {
  return (
    <div className="App">
      <GlobalStyles />
      <Router>
        <nav>
          <NavBar />
        </nav>

        <Switch>
          <BodyContainer>
            <Route path="/order/details/:id/pay">
              <PaymentScreen />
            </Route>
            <Route path="/order/details/:id" exact>
              <OrderScreen />
            </Route>

            <Route path="/order/checkout">
              <CheckoutScreen />
            </Route>
            <Route path="/order/shipping">
              <ShippingScreen />
            </Route>
            <Route path="/my-account" exact>
              <UserAccountScreen />
            </Route>

            <Route path="/sign-up">
              <RegisterScreen />
            </Route>

            <Route path="/password-reset/:token">
              <PasswordResetScreen />
            </Route>

            <Route path="/login/password-reset">
              <PasswordResetRequestScreen />
            </Route>

            <Route path="/login" exact>
              <LoginScreen />
            </Route>

            <Route path="/mycart">
              <ShoppingCartScreen />
            </Route>

            <Route path="/products/:id" exact>
              <ProductScreen />
            </Route>
            <Route path="/dashboard/products/add-product">
              <CreateProductScreen />
            </Route>
            <Route path="/dashboard/categories" exact>
              <DashBoardCategoriesScreen />
            </Route>
            <Route path="/dashboard/products" exact>
              <ProductsManagerScreen />
            </Route>
            <Route path="/dashboard/users" exact>
              <UserManagerScreen />
            </Route>
            <Route path="/dashboard/orders" exact>
              <OrderManageScreen />
            </Route>

            <Route path="/category/:category">
              <ProductsByCategoriesScreen />
            </Route>

            <Route path="/dashboard" exact>
              <DashBoardScreen />
            </Route>

            <Route path="/" exact>
              <HomeScreen />
            </Route>
          </BodyContainer>
        </Switch>
      </Router>
      <ToastContainer
        transition={Zoom}
        autoClose={2500}
        style={{ color: "black" }}
      />
    </div>
  );
}

const BodyContainer = styled.div`
  min-height: 100vh;
`;

export default App;
