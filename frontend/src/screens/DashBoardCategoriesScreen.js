import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon, Table } from "semantic-ui-react";
import styled from "styled-components";

import { getCategoriesAction } from "../actions/productsActions";
import LoadingComponent from "../Components/LoadingComponent";

const DashBoardCategoriesScreen = () => {
  const dispatch = useDispatch();
  const { loading, categories } = useSelector((state) => state.categories);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getCategoriesAction());
  }, [dispatch]);

  return (
    <>
      {loading && <LoadingComponent />}
      {loading === false && (
        <MainContainer className="centered">
          <h3> Categories Available </h3>
          <hr></hr>

          <Table celled fixed singleLine>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Category Id</Table.HeaderCell>
                <Table.HeaderCell>Category Name</Table.HeaderCell>
                <Table.HeaderCell className="del-column"></Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {categories &&
                categories.map((category) => (
                  <Table.Row>
                    <Table.Cell>{category._id}</Table.Cell>
                    <Table.Cell>{category.name}</Table.Cell>

                    <Table.Cell textAlign="center">
                      <Icon name="delete" color="red" />
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

  .del-column {
    width: 60px;
  }
`;

export default DashBoardCategoriesScreen;
