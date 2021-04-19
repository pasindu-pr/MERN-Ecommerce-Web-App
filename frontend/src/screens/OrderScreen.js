import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { Grid, Divider, Button } from "semantic-ui-react";
import CheckoutItemComponent from "../Components/CheckoutItemComponent";
import LoadingComponent from "../Components/LoadingComponent";
import { getOrderDetailsAction } from "../actions/orderActions";

const OrderScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const orderDetails = useSelector((state) => state.orderDetails);
  const {
    loading: orderDetailsLoading,
    success: orderDetailsSuccess,
    order,
  } = orderDetails;

  console.log(order);

  useEffect(() => {
    dispatch(getOrderDetailsAction(id));
  }, [id, dispatch]);

  const handleClick = () => {
    history.push(`/order/details/${id}/pay`);
  };

  return (
    <MainContainer className="centered">
      {orderDetailsLoading && <LoadingComponent />}
      {orderDetailsSuccess && (
        <>
          <h3>
            Order ID : {id} | {order.user.email} |
            {order.createdDate.substring(0, 10)}
            <img
              src="/images/payments/paid-tick.svg"
              alt="paid-tick"
              className="paid-tick"
            />
          </h3>
          <Divider />
          <Grid>
            <Grid.Row>
              <Grid.Column width={8}>
                <h4> Shipping Address </h4>
                <Divider />
                <p>
                  {`${order.shippingAddress.fName} ${order.shippingAddress.lName}`}
                  ,
                </p>
                <p> {order.shippingAddress.address1}, </p>
                <p> {order.shippingAddress.address2}, </p>
                <p> {order.shippingAddress.city}, </p>
                <p> {order.shippingAddress.state}. </p>
                <Divider />
                <h4> Items </h4>
                {order.products.map((item) => (
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
                  <p> $ {order.productsTotalPrice}</p>
                </div>
                <div className="price-div-s">
                  <p> Shipping Price </p>
                  <p> $ {order.shippingPrice} </p>
                </div>
                <div className="price-div-s">
                  <p> Shipping Method </p>
                  <p> {order.shippingMethod} </p>
                </div>
                <div className="price-div">
                  <p> Value Added Tax </p>
                  <p> $ {order.vat} </p>
                </div>
                <div className="price-div">
                  <p> Discount </p>
                  <p> $ {order.discount} </p>
                </div>
                <div className="ui divider"></div>
                <div className="price-div">
                  <p> Total Price </p>
                  <p> $ {order.totalOrderPrice} </p>
                </div>
                <div className="price-div">
                  <p> Payment Status </p>
                  <p>{order.isPaid ? "Paid" : "Not Paid"}</p>
                </div>
                {order.isPaid && (
                  <>
                    <div className="price-div">
                      <p> Payment Amount</p>
                      <p>$ {order.paymentDetails.recievedAmount / 100}</p>
                    </div>
                    <div className="price-div">
                      <p> Payment Date </p>
                      <p>{order.paidAt.substring(0, 10)}</p>
                    </div>

                    <div className="price-div">
                      <p> Payment Type </p>
                      <p>{order.paymentDetails.cardBrand}</p>
                    </div>
                    <div className="price-div">
                      <p> Shipping Status </p>
                      <p>
                        {order.isShipped ? "Shipped" : "Waiting for dispatch"}
                      </p>
                    </div>
                  </>
                )}

                {!order.isPaid ? (
                  <Button fluid color="orange" onClick={handleClick}>
                    Pay Now
                  </Button>
                ) : (
                  <PaidLogoContainer>
                    <img
                      src="/images/payments/paid-logo.png"
                      className="paid-logo"
                      alt="paid"
                    />
                  </PaidLogoContainer>
                )}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </>
      )}
    </MainContainer>
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

  .paid-tick {
    margin: auto;
    width: 15px;
    margin-left: 5px;
  }
`;

const PaidLogoContainer = styled.div`
  width: 100%;
  text-align: center;
  .paid-logo {
    width: 8rem;
    text-align: center;
    margin: 1rem auto;
  }
`;

export default OrderScreen;
