import React from "react";
import PaymentScreen from "../screens/PaymentScreen";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51ISjvGKyAujpXbVztUCNyO2cCURe88SeftvB6sGnTtH8OJ8cp9B79Zz2QvZA0SJy8KpG6qjCDMQBpZuJUiDEZk6h00nkaDylIa"
);

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
