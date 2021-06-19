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
          <CatHeading>{`${_.capitalize(category)}`} at Emporium</CatHeading>

          <Cards>
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
          </Cards>
        </MainContainer>
      )}
    </>
  );
};

const MainContainer = styled.div`
  min-width: 100vw;
  min-height: 100vh;
`;

const CatHeading = styled.h1`
  padding-top: 10px;
  text-align: center;
  color: #161616;
`;

const Cards = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(4, 1fr);
  grid-row-gap: 20px;

  @media only screen and (max-width: 1308px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media only screen and (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media only screen and (max-width: 720px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export default ProductsCategoriesScreen;
