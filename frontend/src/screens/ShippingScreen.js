import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Form, Divider } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import MessageComponent from "../Components/MessageComponents/MessageComponent";
import { shippingDetailsActions } from "../actions/orderActions";
import { checkShippingDetails } from "../Configurations/shippingDetailsConfigure";

const ShippingScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [customer, setCustomer] = useState({
    fName: "",
    lName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
  });

  const user = useSelector((state) => state.user);
  const { loggedUser } = user;

  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (loggedUser && Object.keys(loggedUser).length === 0) {
      history.push("/login?redirect=/order/shipping");
    }
  }, [loggedUser, history]);

  const handleChnage = (event) => {
    const { name, value } = event.target;
    setCustomer((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { error } = checkShippingDetails(
      customer.fName,
      customer.lName,
      customer.address1,
      customer.address2,
      customer.state,
      customer.city
    );

    if (!error) {
      dispatch(shippingDetailsActions(customer));
      history.push("/order/checkout");
    } else {
      setFormError(error);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <h3> Shipping </h3>
      <Divider />
      <p> Enter your shipping details. </p>
      <Form className="center">
        {formError && <MessageComponent content={formError.toString()} />}
        <Form.Input
          fluid
          label="First name"
          name="fName"
          value={customer.fName}
          onChange={handleChnage}
          placeholder="First name"
        />
        <Form.Input
          fluid
          label="Last name"
          name="lName"
          value={customer.lName}
          onChange={handleChnage}
          placeholder="Last name"
        />

        <Form.Field>
          <label>Address Line 01</label>
          <input
            name="address1"
            value={customer.address1}
            placeholder="Address Line 01"
            onChange={handleChnage}
          />
        </Form.Field>
        <Form.Field>
          <label>Address Line 02</label>
          <input
            name="address2"
            value={customer.address2}
            placeholder="Address Line 02"
            onChange={handleChnage}
          />
        </Form.Field>

        <Form.Group widths="equal">
          <Form.Input
            fluid
            label="City"
            name="city"
            value={customer.city}
            placeholder="First name"
            onChange={handleChnage}
          />
          <Form.Input
            fluid
            name="state"
            value={customer.state}
            label="Province/State"
            placeholder="Province/State"
            onChange={handleChnage}
          />
        </Form.Group>

        <Form.Button type="submit" color="orange">
          Checkout
        </Form.Button>
      </Form>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  margin: 0 auto;
  max-width: 80%;
  padding: 1rem;

  p {
    margin-bottom: 1.5rem;
  }

  .button {
    margin-top: 1rem;
  }
`;

export default ShippingScreen;
