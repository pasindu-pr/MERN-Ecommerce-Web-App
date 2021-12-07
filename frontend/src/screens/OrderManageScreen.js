import React, { useEffect } from "react";
import styled from "styled-components";
import { Table, Icon, Button } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";

import { dashBoardOrdersAction } from "../actions/dashBoardActions";
import LoadingComponent from "../Components/LoadingComponent";
import axios from "axios";

const OrderManageScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(dashBoardOrdersAction());
  }, [dispatch]);

  const user = useSelector((state) => state.user);
  const { loggedUser } = user;

  useEffect(() => {
    if (!loggedUser) {
      history.push("/login");
    }
  }, [loggedUser, history]);

  const { loading, orders } = useSelector((state) => state.dashBoardOrders);

  const handleShipClick = async (orderId) => {
    try {
      await axios.put("/api/dashboard/ship", {
        orderId,
      });

      dispatch(dashBoardOrdersAction());
    } catch (error) {
      alert("Something went wrong!");
    }
  };

  return (
    <>
      {loading && <LoadingComponent />}

      {loading === false && (
        <MainContainer className="centered">
          <h3> Orders Recieved </h3>
          <hr></hr>

          <Table celled fixed singleLine>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign="center">Order Id</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">User</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">Payment</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">Shipping</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {orders &&
                orders.map((order, i) => (
                  <Table.Row key={i}>
                    <Table.Cell textAlign="center">
                      <Link to={`/order/details/${order._id}`}>
                        {order._id}
                      </Link>
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      {order.user.email}
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      {order.isPaid ? (
                        <>
                          Paid &nbsp;
                          <Icon name="checkmark" color="green" />
                        </>
                      ) : (
                        "Not Paid"
                      )}
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      {order.isDelivered ? (
                        <>
                          Delivered &nbsp;
                          <Icon name="checkmark" color="green" />
                        </>
                      ) : (
                        <>
                          Not Delivered
                          <Button
                            animated="vertical"
                            floated="right"
                            color="orange"
                            className="not-delivered"
                            onClick={() => handleShipClick(order._id)}
                          >
                            <Button.Content hidden>Ship </Button.Content>
                            <Button.Content visible>
                              <Icon name="shipping" />
                            </Button.Content>
                          </Button>
                        </>
                      )}
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </MainContainer>
      )}
    </>
  );
};

const MainContainer = styled.div`
  max-width: 90%;
  margin: 2rem auto;

  .not-delivered {
    margin-left: 20px;
  }
`;

export default OrderManageScreen;
