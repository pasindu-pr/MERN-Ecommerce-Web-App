import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";
import logo from "../images/logo/emporium-logo.png";
import { userLoginAction } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import MessageComponent from "../Components/MessageComponents/MessageComponent";
import Fade from "react-reveal/Fade";

const LoginScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(undefined);
  const [redirectError, setRedirectError] = useState("");

  const getRedirectFromURl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const redirectRoute = urlParams.get("redirect");

    if (redirectRoute) {
      setRedirect(redirectRoute);
      setRedirectError("Please login to place the order!");
    }
  };

  useEffect(() => {
    getRedirectFromURl();
  }, []);

  const submitHandler = () => {
    dispatch(userLoginAction({ email, password }));
  };

  const { success, error, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (success) {
      if (!redirect) {
        history.push("/");
      } else {
        history.push(redirect);
      }
    }
  }, [success, history, redirect]);

  return (
    <Fade duration={1500}>
      <MainContainer>
        <Grid
          textAlign="center"
          style={{ height: "100vh" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ width: 400 }}>
            <Image src={logo} verticalAlign="middle" className="logo" />
            <Header as="p" color="grey" textAlign="center">
              <br /> Log-in to your account
            </Header>

            <Form size="large" onSubmit={submitHandler} loading={loading}>
              <Segment stacked>
                {redirectError && (
                  <MessageComponent content={redirectError.toString()} />
                )}
                {error && <MessageComponent content={error.toString()} />}
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail address"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />

                <Button color="orange" fluid size="large" type="submit">
                  Login
                </Button>
              </Segment>
            </Form>
            <Link to="/sign-up">
              <Message>New user? Sign up here.</Message>
            </Link>

            <Link to="/login/password-reset">
              <p>Forgot Password? </p>
            </Link>
          </Grid.Column>
        </Grid>
      </MainContainer>
    </Fade>
  );
};

const MainContainer = styled.div`
  .logo {
    width: 150px;
  }

  p {
    margin-top: 10px;
  }
`;

export default LoginScreen;
