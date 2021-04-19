import React, { useEffect } from "react";
import styled from "styled-components";
import { Table, Icon } from "semantic-ui-react";
import { dashBoardUsersAction } from "../actions/dashBoardActions";
import { useSelector, useDispatch } from "react-redux";
import LoadingComponent from "../Components/LoadingComponent";
import { useHistory, Link } from "react-router-dom";

const UserManageScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(dashBoardUsersAction());
  }, [dispatch]);

  const user = useSelector((state) => state.user);
  const { loggedUser } = user;

  useEffect(() => {
    if (!loggedUser) {
      history.push("/login");
    }
  }, [loggedUser, history]);

  const { loading, users } = useSelector((state) => state.dashBoardUsers);

  return (
    <>
      {loading && <LoadingComponent />}

      {loading === false && (
        <MainContainer className="centered">
          <h3> Registered Users </h3>
          <hr></hr>

          <Table celled fixed singleLine>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>User ID</Table.HeaderCell>
                <Table.HeaderCell>User Name</Table.HeaderCell>
                <Table.HeaderCell>Email</Table.HeaderCell>
                <Table.HeaderCell>Account Type</Table.HeaderCell>
                <Table.HeaderCell>Account Type</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {users &&
                users.map((user) => (
                  <Table.Row>
                    <Table.Cell>
                      <Link to={`/order/details/${user._id}`}>{user._id}</Link>
                    </Table.Cell>
                    <Table.Cell>{user.name}</Table.Cell>
                    <Table.Cell textAlign="center">{user.email}</Table.Cell>
                    <Table.Cell>{user.joined.substr(0, 10)}</Table.Cell>
                    <Table.Cell>
                      {user.accountType === "Administrator" ? (
                        <>
                          "Administrator"
                          <Icon name="checkmark" color="green" />
                        </>
                      ) : (
                        "Customer"
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

export default UserManageScreen;
