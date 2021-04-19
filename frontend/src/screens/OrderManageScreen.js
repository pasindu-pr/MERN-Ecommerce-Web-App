import React, { useEffect } from "react";
import styled from "styled-components";
import { Table, Icon } from "semantic-ui-react";
import { dashBoardOrdersAction } from "../actions/dashBoardActions";
import { useSelector, useDispatch } from "react-redux";
import LoadingComponent from "../Components/LoadingComponent";
import { useHistory, Link } from "react-router-dom";

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
                <Table.HeaderCell>Order Id</Table.HeaderCell>
                <Table.HeaderCell>User</Table.HeaderCell>
                <Table.HeaderCell>Payment</Table.HeaderCell>
                <Table.HeaderCell>Shipping</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {orders &&
                orders.map((order) => (
                  <Table.Row>
                    <Table.Cell>
                      <Link to={`/order/details/${order._id}`}>
                        {order._id}
                      </Link>
                    </Table.Cell>
                    <Table.Cell>{order.user.email}</Table.Cell>
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
                    <Table.Cell>
                      {order.isDelivered ? (
                        <>
                          Delivered &nbsp;
                          <Icon name="checkmark" color="green" />
                        </>
                      ) : (
                        "Not Delivered"
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
`;

export default OrderManageScreen;
