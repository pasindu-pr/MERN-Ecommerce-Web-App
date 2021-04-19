import React, { useEffect } from "react";
import { Image, Button } from "semantic-ui-react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { userLogoutAction } from "../actions/generalActions";

const UserAccountScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const { loggedUser } = user;

  useEffect(() => {
    if (!loggedUser) {
      history.push("/login");
    }
  }, [history, loggedUser]);

  const handleClick = () => {
    dispatch(userLogoutAction());
    history.push("/");
  };

  return (
    <>
      <MainContainer>
        {loggedUser && (
          <>
            <UserCard>
              <Image src="images/user.png" size="small" circular />

              <ul>
                <li> Name: {loggedUser.name} </li>
                <li> Email: {loggedUser.email} </li>
                <li> Joined : {loggedUser.joined.substring(0, 10)} </li>
                <Button color="green" onClick={handleClick}>
                  {" "}
                  Log Out{" "}
                </Button>
              </ul>
            </UserCard>
          </>
        )}
      </MainContainer>
    </>
  );
};

const MainContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserCard = styled.div`
  -webkit-box-shadow: 1px 1px 1px 3px rgba(0, 0, 0, 0.1);
  box-shadow: 1px 1px 1px 3px rgba(0, 0, 0, 0.1);

  ul {
    list-style-type: none;
    margin-left: 2rem;
  }

  height: 250px;
  width: 500px;
  display: flex;
  align-items: center;
  justify-content: center;

  .button {
    margin-top: 10px;
  }
`;

export default UserAccountScreen;
