import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Card } from "semantic-ui-react";
import LoadingComponent from "../Components/LoadingComponent";
import ProductComponent from "../Components/ProductComponent";
import styled from "styled-components";
import { getProductsByCategoriesAction } from "../actions/productsActions";
import _ from "lodash";

const ProductsCategoriesScreen = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const category = params.category;

  const { loading, products } = useSelector(
    (state) => state.getProductsByCategory
  );

  useEffect(() => {
    dispatch(getProductsByCategoriesAction(category));
  }, [dispatch, category]);

  return (
    <>
      {loading && <LoadingComponent />}
      {products && (
        <MainContainer>
          <CatHeading>{`${_.capitalize(category)}`}</CatHeading>

          <Card.Group>
            {products.map((product) => (
              <ProductComponent
                key={product._id}
                name={product.name}
                image={product.image}
                rating={product.rating}
                price={product.price}
                product_id={product._id}
              />
            ))}
          </Card.Group>
        </MainContainer>
      )}
    </>
  );
};

const MainContainer = styled.div``;

const CatHeading = styled.h1`
  margin: 2rem 0;
  text-align: center;
`;

export default ProductsCategoriesScreen;
