import React, { useEffect } from "react";
import styled from "styled-components";
import { Table, Button, Icon } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { getCurrentUserOrdersAction } from "../actions/orderActions";
import LoadingComponent from "../Components/LoadingComponent";
import Paginate from "../Components/Paginate";

const CurrentUserOrdersScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  const pageNumber = params.page || 1;

  const user = useSelector((state) => state.user);

  const { loggedUser } = user;

  const { loading, orders, pages } = useSelector(
    (state) => state.currentUserOrders
  );

  useEffect(() => {
    if (!loggedUser) {
      history.push("/login");
    }
  }, [loggedUser, history]);

  useEffect(() => {
    dispatch(getCurrentUserOrdersAction(pageNumber));
  }, [pageNumber, dispatch]);

  return (
    <>
      {loading && <LoadingComponent />}

      {loading === false && (
        <MainContainer className="centered">
          <h3> My Orders </h3>
          <hr></hr>

          <Table celled fixed singleLine>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign="center">Order ID</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                  Order Price
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                  Shipping Method
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                  Ordered Date
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                  Payment Date
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center"></Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {orders &&
                orders.map((order) => (
                  <Table.Row key={order._id}>
                    <Table.Cell textAlign="center">{order._id}</Table.Cell>
                    <Table.Cell textAlign="center">
                      $ {order.totalOrderPrice}
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      {order.shippingMethod}
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      {order.createdAt.slice(0, 10)}
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      {order.isPaid && order.paidAt.slice(0, 10)}
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      <Button
                        color="orange"
                        animated
                        onClick={() =>
                          history.push(`/order/details/${order._id}`)
                        }
                      >
                        <Button.Content visible>Details</Button.Content>
                        <Button.Content hidden>
                          <Icon name="arrow right" />
                        </Button.Content>
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>

          <Paginate
            totalPages={pages}
            page={pageNumber}
            pageName="CURRENT_USER_ORDERS"
          />
        </MainContainer>
      )}
    </>
  );
};

const MainContainer = styled.div`
  max-width: 90%;
  margin: 2rem auto;

  .checkCol {
    width: 40px;
  }
`;

export default CurrentUserOrdersScreen;
