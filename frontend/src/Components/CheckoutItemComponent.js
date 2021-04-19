import React from "react";
import styled from "styled-components";
import { Divider } from "semantic-ui-react";

const CheckoutItemComponent = ({ name, quantity, price, image }) => {
  return (
    <>
      <CheckOutItem>
        <ItemImage>
          <img src={image} alt="item" />
        </ItemImage>
        <ItemContent>
          <p>
            {name} <br /> Quantity: &nbsp; {quantity} <br /> Price : {price}
          </p>
        </ItemContent>
        <Divider />
      </CheckOutItem>
    </>
  );
};

const CheckOutItem = styled.div`
  width: 100%;
`;

const ItemImage = styled.div`
  img {
    width: 70px;
  }
  float: left;
  width: 80px;
`;

const ItemContent = styled.div`
  margin-left: 10px;
`;

export default CheckoutItemComponent;
