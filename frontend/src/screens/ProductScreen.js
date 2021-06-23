import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import { Button, Image, Grid, Icon } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetailsAction } from "../actions/productsActions";
import { addToCartAction } from "../actions/shoppingCartActions";
import LoadingComponent from "../Components/LoadingComponent";
import { toast } from "react-toastify";
import Zoom from "react-reveal";
import "react-toastify/dist/ReactToastify.css";

const ProductScreen = () => {
  const dispatch = useDispatch();
  //Get product Id
  const { id: productId } = useParams();
  const history = useHistory();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product } = productDetails;

  const [stars, setStars] = useState([]);
  const starRating = () => {
    const rating = 4;
    const starsArray = [];
    const roundedRating = Math.floor(rating);

    for (let i = 1; i <= roundedRating; i++) {
      starsArray.push("*");
    }

    setStars(starsArray);
  };

  const [quantity, setQuantity] = useState(1);

  const quantityIncrementHandler = () => {
    if (product.stockCount <= quantity) {
      setQuantity(quantity);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const quantityDecrementHandler = () => {
    if (quantity === 1) {
      setQuantity(quantity);
    } else {
      setQuantity(quantity - 1);
    }
  };

  const prevPageHandler = () => {
    history.goBack();
  };

  const notification = () => {
    toast.warning("Added to cart!");
  };

  const addToCartHandler = () => {
    dispatch(
      addToCartAction({
        _id: product._id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.image,
      })
    );
    notification();
    console.log("Dispatched");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    starRating();
    dispatch(getProductDetailsAction(productId));
  }, [dispatch, productId]);

  return (
    <Zoom>
      <MainContainer className="ui">
        {loading ? (
          <LoadingComponent />
        ) : (
          <>
            <Grid columns={2} stackable>
              <Grid.Column>
                <Image bordered className="centered" src={product.image} />
              </Grid.Column>

              <Grid.Column className="right-column" verticalAlign="middle">
                <DeatilsContainer>
                  <h3>{product.name}</h3>
                  <p>
                    Rating : {product.rating} <br />
                    {stars.map((star, index) => (
                      <img
                        key={index}
                        width="15px"
                        src="/images/star/star.png"
                        alt="star-rating"
                      />
                    ))}
                  </p>
                  <h4> Price : $ {product.price} </h4>
                  <p>{product.description}</p>

                  <h4>
                    {product.stockCount === 0
                      ? "Out of Stock!"
                      : `Quantity: ${quantity}`}
                  </h4>
                  <Button.Group size="small" className="btn-group">
                    <Button
                      disabled={product.stockCount === 0 && true}
                      icon="left chevron"
                      onClick={quantityDecrementHandler}
                    />
                    <Button
                      disabled={product.stockCount === 0 && true}
                      icon="right chevron"
                      onClick={quantityIncrementHandler}
                    />
                    <Button
                      disabled={product.stockCount === 0 && true}
                      color="orange"
                      animated="fade"
                      onClick={addToCartHandler}
                    >
                      <Button.Content visible>Add to cart</Button.Content>
                      <Button.Content hidden>
                        Quantity : {quantity}
                      </Button.Content>
                    </Button>
                  </Button.Group>

                  <h4
                    style={{ color: "#fb743e", cursor: "pointer" }}
                    onClick={prevPageHandler}
                  >
                    <Icon name="arrow left" /> Previous Page
                  </h4>
                </DeatilsContainer>
              </Grid.Column>
            </Grid>
          </>
        )}
      </MainContainer>
    </Zoom>
  );
};

const MainContainer = styled.div`
  .segment {
    background: #0000 !important;
  }

  .grid {
    margin-top: 6rem;
  }

  .image {
    border-radius: 10px !important;
    max-width: 550px;
    max-height: 450px;
    object-fit: contain;
  }

  .right-column {
    max-width: 40rem;
  }

  .btn-group {
    margin: 1rem 0;
  }

  .notfication-background {
    background: #0000 !important ;
  }

  @media only screen and (max-width: 480px) {
    .grid {
      margin-top: 1rem;
    }
  }

  @media only screen and (max-width: 740px) {
    .grid {
      margin-top: 1rem;
    }
  }

  @media only screen and (max-width: 858px) {
    .grid {
      margin: 1rem 2rem;
    }
  }
`;

const DeatilsContainer = styled.div`
  h3 {
    font-family: "Nunito", sans-serif;
  }
  p {
    font-family: "Open Sans", sans-serif;
  }
`;

export default ProductScreen;
