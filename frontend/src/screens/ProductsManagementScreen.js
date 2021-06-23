import React, { useEffect } from "react";
import styled from "styled-components";
import { Table, Checkbox, Button } from "semantic-ui-react";
import { dashBoardProductsAction } from "../actions/dashBoardActions";
import {
  addProductsToDeleteAction,
  removeProductsToDeleteAction,
  deleteProductsAction,
} from "../actions/productsActions";
import { useSelector, useDispatch } from "react-redux";
import LoadingComponent from "../Components/LoadingComponent";
import { useHistory, Link, useParams } from "react-router-dom";
import Paginate from "../Components/Paginate";

const ProductManageScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  const pageNumber = params.page || 1;

  const user = useSelector((state) => state.user);
  const { loggedUser } = user;

  const { loading, products, page, pages } = useSelector(
    (state) => state.dashBoardProducts
  );
  const productsToDelete = useSelector((state) => state.productsToDelete);
  const { success: productsDeleteSuccess } = useSelector(
    (state) => state.deleteProducts
  );

  const handleChange = (event, data) => {
    if (data.checked) {
      dispatch(addProductsToDeleteAction(data.value));
    } else {
      dispatch(removeProductsToDeleteAction(data.value));
    }
  };

  useEffect(() => {
    dispatch(dashBoardProductsAction(pageNumber));
  }, [dispatch, pageNumber]);

  useEffect(() => {
    if (!loggedUser) {
      history.push("/login");
    }
  }, [loggedUser, history]);

  useEffect(() => {
    if (productsDeleteSuccess) {
      dispatch(dashBoardProductsAction());
      dispatch({
        type: "PRODUCTS_DELETE_RESET",
      });
    }
  }, [dispatch, productsDeleteSuccess]);

  const deleteProducts = () => {
    dispatch(deleteProductsAction(productsToDelete));
  };

  return (
    <>
      {loading && <LoadingComponent />}

      {loading === false && (
        <MainContainer className="centered">
          <h3> Products </h3>
          <hr></hr>

          <Table celled fixed singleLine>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell className="checkCol"></Table.HeaderCell>
                <Table.HeaderCell>Product Id</Table.HeaderCell>
                <Table.HeaderCell>Product Name</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">Price</Table.HeaderCell>
                <Table.HeaderCell>Category</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">Stock</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {products &&
                products.map((product) => (
                  <Table.Row key={product._id}>
                    <Table.Cell>
                      <Checkbox onClick={handleChange} value={product._id} />
                    </Table.Cell>
                    <Table.Cell>{product._id}</Table.Cell>
                    <Table.Cell>{product.name}</Table.Cell>
                    <Table.Cell textAlign="center">
                      $ {product.price}
                    </Table.Cell>
                    <Table.Cell>{product.category}</Table.Cell>
                    <Table.Cell textAlign="center">
                      {product.stockCount}
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
          <Link to="/dashboard/products/add-product">
            <Button color="green"> Add Product </Button>
          </Link>

          <Button
            disabled={productsToDelete.length === 0}
            onClick={deleteProducts}
            color="red"
          >
            {productsToDelete.length === 1 || productsToDelete.length === 0
              ? "Delete Product"
              : "Delete Products"}
          </Button>

          <Paginate page={page} totalPages={pages} pageName="AdminProducts" />
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

export default ProductManageScreen;
