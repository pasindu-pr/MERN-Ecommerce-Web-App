import React, { useEffect } from "react";
import styled from "styled-components";
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
import { Link } from "react-router-dom";

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
    <Fade duration={1000}>
      <CarousalComponent />
      <CatContainer>
        <h3> Categories </h3>
        <CardsContainer>
          <CardGroup textAlign="center">
            {categoriesLoading ? (
              <LoadingComponent />
            ) : (
              <>
                {productsCategories.map((category) => (
                  <Link key={category._id} to={`/category/${category.name}`}>
                    <CategoryComponent
                      name={category.name}
                      image={category.image}
                      description={category.description}
                    />
                  </Link>
                ))}
              </>
            )}
          </CardGroup>
          <h3> Latest Products</h3>

          <CardGroup>
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
          </CardGroup>
        </CardsContainer>
      </CatContainer>

      <footer>
        <Footer />
      </footer>
    </Fade>
  );
};

// const MainContainer = styled.div``;

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

const CardGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-row-gap: 20px;
  grid-column-gap: 10px;

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

export default HomeScreen;
