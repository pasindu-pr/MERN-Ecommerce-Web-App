import React, { useState, useEffect } from "react";
import { Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { truncateName } from "../Configurations/nameConfigure";

const ProductComponent = ({ name, rating, price, image, product_id }) => {
  const [stars, setStars] = useState([]);

  const starRating = (rating) => {
    // const rating = 4;
    const starsArray = [];
    const roundedRating = Math.floor(rating);

    for (let i = 1; i <= roundedRating; i++) {
      starsArray.push("*");
    }

    setStars(starsArray);
  };

  useEffect(() => {
    starRating(rating);
  }, [rating]);

  return (
    <>
      <Card className="centered">
        <Image src={image} centered />
        <Card.Content>
          <Card.Header
            style={{
              fontSize: "13px",
              fontFamily: "Open Sans",
            }}
          >
            <Link
              to={`/products/${product_id}`}
              style={{ fontFamily: "Open Sans", color: "black" }}
            >
              {truncateName(name)}
            </Link>
          </Card.Header>
          <Card.Meta>
            Rating : {rating} <br />
            {stars.map((star, index) => (
              <img
                width="15px"
                key={index}
                src="/images/star/star.png"
                alt="star-rating"
              />
            ))}
          </Card.Meta>
        </Card.Content>
        <Card.Content>$ : {price}</Card.Content>
      </Card>
    </>
  );
};

export default ProductComponent;
