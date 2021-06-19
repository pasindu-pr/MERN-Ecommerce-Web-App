import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Form, Grid, Header, Image, Message, Segment } from "semantic-ui-react";
import logo from "../images/logo/emporium-logo.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userRegisterAction } from "../actions/userActions";
import { registerInfoValidate } from "../Configurations/authenticator";
import MessageComponent from "../Components/MessageComponents/MessageComponent";
import axios from "axios";

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [formsubError, setFormSubError] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    const validate = registerInfoValidate(name, email, password);
    const { error } = validate;
    setFormSubError(error);

    if (!error) {
      if (password === confirmPassword) {
        dispatch(
          userRegisterAction({
            name,
            email,
            password,
          })
        );
      } else {
        setFormError("Password and Confirm Password does not match!");
      }
    }
  };

  const { loading, success, error } = useSelector(
    (state) => state.registerUser
  );

  const sendRegistrationEmail = async (name, email) => {
    await axios.post(
      "/api/mails/newsignup",
      {
        user: name,
        uEmail: email,
      },
      {
        headers: {
          "Content-type": "Application/json",
        },
      }
    );
  };

  useEffect(() => {
    if (success) {
      sendRegistrationEmail(name, email);
      history.push("/login");
    }
  }, [success, history, name, email]);

  return (
    <MainContainer>
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ width: 400 }}>
          <Image src={logo} verticalAlign="middle" className="logo" />
          <Header as="p" color="grey" textAlign="center">
            Enter Your Details To Register
          </Header>

          <Form size="large" onSubmit={submitHandler} loading={loading}>
            <Segment stacked>
              {error ? (
                <MessageComponent content={error} />
              ) : formsubError ? (
                <MessageComponent content={formsubError.toString()} />
              ) : (
                ""
              )}
              {formError && <MessageComponent content={formError} />}

              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Form.Input
                fluid
                icon="mail"
                iconPosition="left"
                placeholder="E-mail address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <Form.Button color="orange" fluid size="large" type="submit">
                Register
              </Form.Button>
            </Segment>
          </Form>
          <Link to="/login">
            <Message>Existing User ? Login here.</Message>
          </Link>
        </Grid.Column>
      </Grid>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  .logo {
    width: 150px;
  }

  .form.loading {
    background-color: orange;
  }
`;

export default RegisterScreen;
