import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Statistic, Button } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";

import LoadingComponent from "../Components/LoadingComponent";
import { dashBoardDetailsAction } from "../actions/dashBoardActions";

const DashBoardScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(dashBoardDetailsAction());
  }, [dispatch]);

  const { loading, details, success } = useSelector(
    (state) => state.darshBoardDetails
  );

  const user = useSelector((state) => state.user);
  const { loggedUser } = user;

  useEffect(() => {
    if (!loggedUser) {
      history.push("/login");
    }
  }, [loggedUser, history]);

  const orderHandler = () => {
    history.push("/dashboard/orders");
  };

  const userHandler = () => {
    history.push("/dashboard/users");
  };

  const productHandler = () => {
    history.push("/dashboard/products/1");
  };

  const categoryHandler = () => {
    history.push("/dashboard/categories");
  };

  return (
    <>
      {loading && <LoadingComponent />}

      {success && (
        <MainContainer>
          <Card>
            <Statistic size="tiny" className="item">
              <Statistic.Value>{details.orders}</Statistic.Value>
              <Statistic.Label>Orders</Statistic.Label>
            </Statistic>
            <Statistic size="tiny" className="item">
              <Statistic.Value>{details.ordersToShip}</Statistic.Value>
              <Statistic.Label>Orders to ship</Statistic.Label>
            </Statistic>
            <Statistic size="small" className="item">
              <Statistic.Value>${details.revenue}</Statistic.Value>
              <Statistic.Label>Revenue</Statistic.Label>
            </Statistic>
            <Statistic size="tiny" className="item">
              <Statistic.Value>{details.products}</Statistic.Value>
              <Statistic.Label>No of Products</Statistic.Label>
            </Statistic>
            <Statistic size="tiny" className="item">
              <Statistic.Value>{details.users}</Statistic.Value>
              <Statistic.Label>Sign ups</Statistic.Label>
            </Statistic>
          </Card>

          <ButtonContainer>
            <Button.Group>
              <Button positive onClick={orderHandler}>
                Order Management
              </Button>
              <Button.Or />
              <Button positive onClick={productHandler}>
                Product Management
              </Button>
              <Button.Or />
              <Button positive onClick={userHandler}>
                User Management
              </Button>
            </Button.Group>
          </ButtonContainer>

          <ButtonContainer>
            <Button.Group>
              <Button positive onClick={categoryHandler}>
                Category Management
              </Button>
              <Button.Or />
              <Button positive>Carousel Management</Button>
            </Button.Group>
          </ButtonContainer>
        </MainContainer>
      )}
    </>
  );
};

const MainContainer = styled.div`
  background-color: #eeebdd;
  width: 100vw;
  height: 100vh;
`;

const Card = styled.div`
  width: 100vw;
  height: 20vh;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  .item {
    margin-right: 30px !important;
  }
`;

const ButtonContainer = styled.div`
  width: 100vw;
  margin-left: 32%;
  margin-top: 4%;
`;

export default DashBoardScreen;
