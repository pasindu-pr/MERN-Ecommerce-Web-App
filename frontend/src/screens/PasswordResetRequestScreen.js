import React, { useState } from "react";
import styled from "styled-components";
import { Button, Form, Grid, Header, Image, Segment } from "semantic-ui-react";
import logo from "../images/logo/emporium-logo.png";
import MessageComponent from "../Components/MessageComponents/MessageComponent";
import Fade from "react-reveal";
import axios from "axios";

const PasswordResetScreen = () => {
  const [email, setEmail] = useState("");
  const [process, setProcess] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const submitHandler = async () => {
    try {
      setProcess(true);
      const { data } = await axios.post(
        "/api/users/send-password-reset",
        {
          email,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      setProcess(false);
      setMessage(data.message);
    } catch (error) {
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response
      );
      setProcess(false);
    }
  };

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
              <br /> Enter your email to reset your password.
            </Header>

            <Form size="large" onSubmit={submitHandler}>
              <Segment stacked>
                {error !== "" ||
                  (message !== "" && (
                    <MessageComponent
                      content={
                        error !== "" ? error.toString() : message.toString()
                      }
                    />
                  ))}
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail address"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />

                <Button
                  loading={process}
                  color="orange"
                  fluid
                  size="large"
                  type="submit"
                >
                  Send Verification Email
                </Button>
              </Segment>
            </Form>
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

export default PasswordResetScreen;
