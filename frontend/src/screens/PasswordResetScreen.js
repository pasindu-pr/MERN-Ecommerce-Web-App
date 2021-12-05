import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Form, Grid, Header, Image, Segment } from "semantic-ui-react";
import Fade from "react-reveal";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

import logo from "../images/logo/emporium-logo.png";
import MessageComponent from "../Components/MessageComponents/MessageComponent";

const PasswordResetScreen = () => {
  const [process, setProcess] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState({
    pw: "",
    confirmpw: "",
  });

  const { token } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (!token) {
      history.push("/login");
    }
  }, [history, token]);

  const submitHandler = async () => {
    if (password.pw !== password.confirmpw) {
      alert("Passwords don't match!");
      return;
    }

    try {
      setProcess(true);
      const { data } = await axios.post(
        "/api/users/reset-password",
        {
          password: password.pw,
          token,
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPassword({
      ...password,
      [name]: value,
    });
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
              <br /> Enter your new password
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
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  onChange={handleChange}
                  value={password.pw}
                  type="password"
                  name="pw"
                />

                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  value={password.confirmpw}
                  type="password"
                  name="confirmpw"
                />

                <Button
                  loading={process}
                  color="orange"
                  fluid
                  size="large"
                  type="submit"
                >
                  Change Password
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
