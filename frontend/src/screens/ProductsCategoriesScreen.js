import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import _ from "lodash";
import styled from "styled-components";
import { Divider, Header } from "semantic-ui-react";

import { getProductsByCategoriesAction } from "../actions/productsActions";

import LoadingComponent from "../Components/LoadingComponent";
import ProductComponent from "../Components/ProductComponent";
import Footer from "../Components/Footer";
import Paginate from "../Components/Paginate";

const ProductsCategoriesScreen = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const category = params.category;
  const pageNumber = params.pageNumber || 1;

  const { loading, products, page, pages } = useSelector(
    (state) => state.getProductsByCategory
  );

  useEffect(() => {
    dispatch(getProductsByCategoriesAction(category, pageNumber));
  }, [dispatch, category, pageNumber]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {loading && <LoadingComponent />}
      {products && (
        <MainContainer>
          <Divider horizontal>
            <Header as="h1" className="heading">
              {`${_.startCase(_.toLower(category))}`} At Emporium
            </Header>
          </Divider>
          <CatHeading></CatHeading>

          <Cards>
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
          </Cards>
        </MainContainer>
      )}

      <Paginate totalPages={pages} category={category} page={page} />
      <footer>
        <Footer />
      </footer>
    </>
  );
};

const MainContainer = styled.div`
  min-width: 100vw;
  min-height: 100vh;

  .heading {
    color: #5c5f63;
  }
`;

const CatHeading = styled.h1`
  padding-top: 10px;
  color: #161616;
  margin-bottom: 20px;
  text-align: center;
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
