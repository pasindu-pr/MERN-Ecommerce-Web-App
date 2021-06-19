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
import Fade from "react-reveal";

const LoginScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = () => {
    dispatch(userLoginAction({ email, password }));
  };

  const { success, error, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (success) {
      history.push("/");
    }
  }, [success, history]);

  return (
    <Fade>
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
`;

export default LoginScreen;
