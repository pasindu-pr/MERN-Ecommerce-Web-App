import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetailsAction } from "../actions/orderActions";
import styled from "styled-components";
import { Button, Divider, Form } from "semantic-ui-react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import LoadingComponent from "../Components/LoadingComponent";
import MessageComponent from "../Components/MessageComponents/MessageComponent";
import axios from "axios";

const PaymentScreen = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading: orderDetailsLoading, order } = orderDetails;

  const [paymentInformation, setPaymentInformation] = useState({
    name: "",
    email: "",
  });

  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentSucess, setPaymentSuccess] = useState(false);
  const [orderUpdate, setOrderUpdate] = useState(false);
  const [seconds, setSeconds] = useState(5);
  useEffect(() => {
    dispatch(getOrderDetailsAction(id));
  }, [dispatch, id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (paymentSucess && orderUpdate) {
      if (seconds !== 0) {
        setTimeout(() => {
          setSeconds(seconds - 1);
        }, 1000);
      } else if (seconds === 0) {
        history.push(`/order/details/${id}`);
      }
    }

    console.log(seconds);
  }, [paymentSucess, orderUpdate, seconds, history, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPaymentInformation((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  //Stripe Payment Process
  const handleSubmit = async (e) => {
    e.preventDefault();
    setPaymentProcessing(true);
    const amount = order.totalOrderPrice * 100;
    const orderId = order ? order._id : "";

    const paymentData = {
      amount: amount,
      email: paymentInformation.email,
      orderId: orderId,
    };

    const { data: paymentIntent } = await axios.post(
      "/api/payments/stripe/payment-intent",
      paymentData
    );

    const cardElement = elements.getElement(CardElement);

    const paymentMethodReq = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: paymentInformation,
    });

    const confirmCardPayment = await stripe.confirmCardPayment(paymentIntent, {
      payment_method: paymentMethodReq.paymentMethod.id,
    });

    setPaymentProcessing(false);

    if (confirmCardPayment.paymentIntent.status === "succeeded") {
      setPaymentSuccess(true);
      const paymentId = confirmCardPayment.paymentIntent.id;

      const { data } = await axios.post("/api/payments/stripe/update-payment", {
        paymentId: paymentId,
      });

      const { data: emailData } = await axios.post(
        "/api/mails/paymentconfirm",
        {
          uEmail: order.user.email,
          orderID: order._id,
          TotalPrice: order.totalOrderPrice,
          payMethod: "Card",
        }
      );

      console.log(emailData);

      if (data.status === "succeeded") {
        setOrderUpdate(true);
      }
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
      },
    },
    hidePostalCode: true,
  };

  return (
    <>
      {orderDetailsLoading && <LoadingComponent />}
      {!orderDetailsLoading && (
        <MainContainer>
          <div className="pay-amount">
            <h3> Payment Amount </h3>
            <h3>$ {order.totalOrderPrice}</h3>
          </div>

          <Divider></Divider>

          {console.log(order)}

          <img
            src="/images/payments/credit-cards.png"
            alt="payment-methods"
            className="payment-methods"
          />
          {paymentSucess && orderUpdate && (
            <MessageComponent
              header="Your payment processed successfully and order status has been updated!"
              content={`You will be Redirected to order page within ${seconds} seconds.`}
            />
          )}
          <Form onSubmit={handleSubmit} loading={paymentProcessing}>
            <Form.Field>
              <label>Name on card</label>
              <input
                placeholder="Name on card"
                name="name"
                value={paymentInformation.name}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Email</label>
              <input
                placeholder="Email"
                name="email"
                value={paymentInformation.email}
                onChange={handleChange}
              />
            </Form.Field>

            <Form.Field>
              <label>Credit/Debit Card Number</label>
              <CreditCardInput className="card-element">
                <CardElement
                  className="card-element-input"
                  options={cardElementOptions}
                />
              </CreditCardInput>
            </Form.Field>

            <Button
              type="submit"
              color="orange"
              fluid
              disabled={(paymentProcessing || paymentSucess) && true}
            >
              Process Payment
            </Button>
          </Form>

          <img
            src="/images/payments/stripe-logo.png"
            alt="stripe-logo"
            className="stripe-logo"
          />
        </MainContainer>
      )}
    </>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 30rem;
  height: 90vh;
  margin: auto;
  justify-content: center;

  .payment-methods {
    width: 15rem;
    margin: 1rem auto;
  }

  h3 {
    font-size: 1rem;
    margin-top: 0;
    margin-bottom: 0;
  }

  .pay-amount {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .stripe-logo {
    width: 8rem;
    margin-top: 1rem;
  }

  button {
    margin-top: 1rem;
  }
`;

const CreditCardInput = styled.div`
  margin: 1rem 0;
  margin-top: 0;
  border: 1px solid #bbbbbb;
  height: 3rem;
  border-radius: 4px;

  .card-element-input {
    padding: 0.8rem;
  }
`;

export default PaymentScreen;
