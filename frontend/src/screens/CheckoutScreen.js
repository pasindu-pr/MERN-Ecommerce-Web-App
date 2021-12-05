import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Grid, Divider, Button } from "semantic-ui-react";

import CheckoutItemComponent from "../Components/CheckoutItemComponent";
import { createNewOrderAction } from "../actions/orderActions";

const CheckoutScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  //Get Shipping Details
  const shippingDetails = useSelector((state) => state.shippingDetails);
  const { fName, lName, address1, address2, city, state } =
    shippingDetails.shippingDetails;

  const {
    loading: newOrderLoading,
    success: newOrderSuccess,
    order: newOrder,
  } = useSelector((state) => state.newOrder);

  const cartItems = useSelector((state) => state.shoppingCart);

  const orderPrices = useSelector((state) => state.orderPrices.orderPrices);

  const handleClick = () => {
    dispatch(
      createNewOrderAction({
        products: cartItems,
        shippingAddress: shippingDetails.shippingDetails,
        productsTotalPrice: orderPrices.itemsPrice,
        shippingPrice: orderPrices.shippingPrice,
        shippingMethod: orderPrices.shippingMethod,
        vat: orderPrices.vat,
        discount: orderPrices.discount,
        totalOrderPrice: orderPrices.totalOrderPrice,
      })
    );
  };

  useEffect(() => {
    if (fName === undefined) {
      history.push("/order/shipping");
    } else if (cartItems.cartProducts.length === 0) {
      history.push("/mycart");
    }
  }, [history, fName, cartItems.cartProducts.length]);

  useEffect(() => {
    if (newOrderSuccess) {
      history.push(`/order/details/${newOrder._id}`);
    }
  }, [newOrderSuccess, history, newOrder]);

  console.log(shippingDetails.shippingDetails);

  return (
    <>
      {cartItems.cartProducts.legnth !== 0 && fName !== undefined && (
        <MainContainer className="centered">
          <h3> Checkout</h3>
          <Divider />
          <Grid>
            <Grid.Row>
              <Grid.Column width={8}>
                <h4> Shipping Address </h4>
                <Divider />
                <p>{`${fName} ${lName}`}, </p>
                <p> {address1}, </p>
                <p> {address2}, </p>
                <p> {city}, </p>
                <p> {state}. </p>
                <Divider />
                <h4> Items </h4>
                {cartItems.cartProducts.map((item) => (
                  <CheckoutItemComponent
                    key={item._id}
                    id={item._id}
                    image={item.image}
                    name={item.name}
                    price={item.price}
                    quantity={item.quantity}
                  />
                ))}
              </Grid.Column>
              <Grid.Column width={8}>
                <h3> Order Summary </h3>
                <div className="ui divider"></div>
                <div className="price-div">
                  <p> Items Price </p>
                  <p> $ {orderPrices.itemsPrice}</p>
                </div>

                <div className="price-div-s">
                  <p> Shipping Price </p>
                  <p> $ {orderPrices.shippingPrice} </p>
                </div>

                <div className="price-div-s">
                  <p> Shipping Method </p>
                  <p> {orderPrices.shippingMethod} </p>
                </div>

                <div className="price-div">
                  <p> Value Added Tax </p>
                  <p> $ {orderPrices.vat} </p>
                </div>

                <div className="price-div">
                  <p> Discount </p>
                  <p> $ {orderPrices.discount} </p>
                </div>

                <div className="ui divider"></div>
                <div className="price-div">
                  <p> Total Price </p>
                  <p> $ {orderPrices.totalOrderPrice} </p>
                </div>

                <Button
                  fluid
                  color="orange"
                  onClick={handleClick}
                  loading={newOrderLoading}
                >
                  Confirm Order
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </MainContainer>
      )}
    </>
  );
};

const MainContainer = styled.div`
  margin: 0 auto;
  max-width: 90%;
  padding: 1rem;

  .price-div,
  .price-div-s {
    display: flex;
    justify-content: space-between;
  }
`;

export default CheckoutScreen;
