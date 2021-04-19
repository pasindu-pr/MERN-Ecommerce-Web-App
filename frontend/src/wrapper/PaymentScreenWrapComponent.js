import React from "react";
import PaymentScreen from "../screens/PaymentScreen";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISH_KEY);

const PaymentScreenWrapComponent = () => {
  return (
    <>
      <Elements stripe={stripePromise}>
        <PaymentScreen />
      </Elements>
    </>
  );
};

export default PaymentScreenWrapComponent;
