import React, { useEffect } from "react";
import styled from "styled-components";
import { Card } from "semantic-ui-react";
import Footer from "../Components/Footer";
import CategoryComponent from "../Components/CategoryComponent";
import ProductComponent from "../Components/ProductComponent";
import CarousalComponent from "../Components/CarousalComponent";
import {
  getLatestProductsAction,
  getCategoriesAction,
} from "../actions/productsActions";
import { useDispatch, useSelector } from "react-redux";
import LoadingComponent from "../Components/LoadingComponent";
import { checkAuthAction } from "../actions/generalActions";
import Fade from "react-reveal";

const HomeScreen = () => {
  const dispatch = useDispatch();

  //Selector
  const latestProducts = useSelector((state) => state.latestProducts);
  const categories = useSelector((state) => state.categories);

  const { loading: latestProductsLoading, products } = latestProducts;

  const user = useSelector((state) => state.user);
  const { loggedUser } = user;

  const {
    loading: categoriesLoading,
    categories: productsCategories,
  } = categories;

  useEffect(() => {
    dispatch(getLatestProductsAction());
    dispatch(getCategoriesAction());
  }, [dispatch]);

  useEffect(() => {
    if (loggedUser !== undefined && Object.keys(loggedUser).length !== 0) {
      dispatch(checkAuthAction());
    }
  }, [loggedUser, dispatch]);

  return (
    <Fade duration="1000">
      <CarousalComponent />
      <CatContainer>
        <h3> Categories </h3>
        <CardsContainer>
          <Card.Group textAlign="center">
            {categoriesLoading ? (
              <LoadingComponent />
            ) : (
              <>
                {productsCategories.map((category) => (
                  <CategoryComponent
                    key={category._id}
                    name={category.name}
                    image={category.image}
                    description={category.description}
                  />
                ))}
              </>
            )}
          </Card.Group>
          <h3> Latest Products</h3>

          <Card.Group>
            {latestProductsLoading ? (
              <LoadingComponent />
            ) : (
              <>
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
              </>
            )}
          </Card.Group>
        </CardsContainer>
      </CatContainer>

      <footer>
        <Footer />
      </footer>
    </Fade>
  );
};

const MainContainer = styled.div``;

const CatContainer = styled.div`
  h3 {
    font-family: "Raleway", sans-serif;
    text-align: center;
    padding-top: 2rem;
  }
`;

const CardsContainer = styled.div`
  margin: 3rem 2rem;
`;

export default HomeScreen;
