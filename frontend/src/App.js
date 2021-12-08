import React, { useEffect } from "react";
import GlobalStyles from "./GlobalStyle/globalStyle";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import styled from "styled-components";
import { ToastContainer, Zoom } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
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
import CurrentUserOrdersScreen from "./screens/CurrentUserOrdersScreen";
import DashBoardCategoriesScreen from "./screens/DashBoardCategoriesScreen";
import { getActivatedSaleAction } from "./actions/salesActions";

function App() {
  const { sale } = useSelector((state) => state.activatedSale);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getActivatedSaleAction());
  }, [dispatch]);

  return (
    <div className="App">
      <GlobalStyles />
      {sale && (
        <SaleAlert>
          <p>
            {sale.saleName} sale has been started!! We offer{" "}
            {sale.discountPrecentage}% off for all products ! Hurry up🎉🎉
          </p>
        </SaleAlert>
      )}
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

            <Route path="/my-orders/page/:page_no" exact>
              <CurrentUserOrdersScreen />
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
            <Route path="/dashboard/products/:page" exact>
              <ProductsManagerScreen />
            </Route>
            <Route path="/dashboard/users" exact>
              <UserManagerScreen />
            </Route>
            <Route path="/dashboard/orders" exact>
              <OrderManageScreen />
            </Route>

            <Route path="/category/:category/page/:pageNumber">
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

const SaleAlert = styled.div`
  width: 100%;
  height: 35px;
  background-color: #ffb830;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 600;
  color: #8c4214;
`;

export default App;
