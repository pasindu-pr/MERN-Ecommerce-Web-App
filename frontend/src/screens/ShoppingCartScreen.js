import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Grid, Button, Item, Select } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { orderPricesActions } from "../actions/orderActions";
import CartItemComponent from "../Components/CartItemComponents";

const ShoppingCartScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const shoppingCart = useSelector((state) => state.shoppingCart);
  const { cartProducts } = shoppingCart;

  const ShippingOptions = [
    { key: 1, value: "STD", text: "Standard Shipping" },
    { key: 2, value: "DHL", text: "DHL" },
  ];

  const [shipping, setShipping] = useState("");
  const [total, setTotal] = useState(0);
  const [shippingPrice, setShippingPrice] = useState(0);
  const [vat, setVat] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [fullOrder, setFullOrder] = useState(0);

  const changeEventHandler = (e, data) => {
    setShipping(data.value);
  };

  useEffect(() => {
    setTotal(
      parseFloat(
        cartProducts
          .reduce((acc, value) => {
            return acc + value.price * value.quantity;
          }, 0)
          .toFixed(2)
      )
    );

    setVat(Math.round((total * 0.029 * 100) / 100));
    setDiscount(total > 250 ? Math.round(total * 0.02 * 100) / 100 : 0);
    setFullOrder(
      Math.round((total + shippingPrice + vat - discount) * 100) / 100
    );

    setShippingPrice(Math.round(total * 0.049 * 100) / 100);

    if (shipping === "STD") {
      setShippingPrice(Math.round((total * 0.049 * 100) / 100));
    } else if (shipping === "DHL") {
      setShippingPrice(Math.round(total * 0.12 * 100) / 100);
    }
  }, [cartProducts, total, shippingPrice, vat, discount, shipping]);

  const handleClick = () => {
    const shippingMethod = shipping === "STD" ? "Standard Shipping" : "DHL";

    dispatch(
      orderPricesActions({
        shippingMethod: shippingMethod,
        itemsPrice: total,
        shippingPrice,
        vat,
        discount,
        totalOrderPrice: fullOrder,
      })
    );
    history.push("order/shipping");
  };

  return (
    <MainContainer>
      <Grid columns={2} centered stackable>
        <Grid.Column>
          <div className="titles-area">
            <h3 className="shopping-heading"> Shopping Cart </h3>
            <h3 className="shopping-heading">
              {cartProducts.length === 0
                ? ""
                : cartProducts.length === 1
                ? `${cartProducts.length} Product`
                : `${cartProducts.length} Products`}
            </h3>
          </div>
          <div className="ui divider"></div>
          <div>
            <Item.Group relaxed>
              {cartProducts.map((cartProduct) => (
                <CartItemComponent
                  key={cartProduct._id}
                  productId={cartProduct._id}
                  image={cartProduct.image}
                  name={cartProduct.name}
                  quantity={cartProduct.quantity}
                  price={cartProduct.price}
                />
              ))}
            </Item.Group>
          </div>
        </Grid.Column>

        <Grid.Column className="right-column">
          <h4> Order Summary </h4>
          <div className="ui divider"></div>
          <div className="price-div">
            <p> Price </p>
            <p> $ {total}</p>
          </div>
          <div>
            <p> Shipping Method: </p>
            <Select
              defaultValue={ShippingOptions[1].value}
              selection
              onChange={changeEventHandler}
              placeholder="Select shipping method"
              options={ShippingOptions}
            />
          </div>
          <div className="price-div-s">
            <p> Shipping Price </p>
            <p> $ {shippingPrice} </p>
          </div>
          <div className="price-div">
            <p> Value Added Tax </p>
            <p> $ {vat} </p>
          </div>
          <div className="price-div">
            <p> Discount </p>
            <p> $ {discount} </p>
          </div>
          <div className="ui divider"></div>
          <div className="price-div">
            <p> Total Price </p>
            <p> $ {fullOrder} </p>
          </div>
          <Button
            fluid
            color="orange"
            onClick={handleClick}
            disabled={cartProducts.length === 0 && true}
          >
            Proceed To Checkout
          </Button>
        </Grid.Column>
      </Grid>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  background-color: #f6f5f5;
  min-width: 100vw;
  min-height: 100vh;
  margin-bottom: 2rem;
  .grid {
    margin-top: 0rem !important;
    padding-top: 2rem;
  }
  .grid {
    font-family: "Open Sans", sans-serif !important;
    font-weight: 400 !important;
  }

  .shopping-heading {
    display: inline-block;
  }

  .titles-area {
    display: flex;
    justify-content: space-between;
    .shopping-heading {
      margin-top: 0;
    }
  }

  .right-column {
    max-width: 300px;
  }

  .heading-text {
    font-size: 13px;
  }

  .item-info {
    font-size: 12px;
  }

  .price-div {
    display: flex;
    justify-content: space-between;
  }
  .price-div-s {
    display: flex;
    justify-content: space-between;
    margin-top: 1.5rem;
  }

  @media screen and (max-width: 845px) {
    padding: 0 2rem;
  }
`;

export default ShoppingCartScreen;
