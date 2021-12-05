import React from "react";
import { Item, Button } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { removeFromCartAction } from "../actions/shoppingCartActions";

const CartItemComponents = ({ productId, name, quantity, price, image }) => {
  const dispatch = useDispatch();

  const removedClickHandler = () => {
    dispatch(removeFromCartAction(productId));
  };

  return (
    <>
      <ItemContainer>
        <Item>
          <Item.Image className="product-image" size="tiny" src={image} />

          <Item.Content verticalAlign="middle">
            <Item.Header>
              <p className="heading-text">{name}</p>
            </Item.Header>
            <Item.Description>
              <div className="item-info">
                <p> Quantity : {quantity} </p>
                <p>Total Price: ${quantity * price}</p>
              </div>
            </Item.Description>

            <Button
              onClick={removedClickHandler}
              floated="right"
              color="orange"
              size="mini"
            >
              Remove from cart
            </Button>
          </Item.Content>
        </Item>
      </ItemContainer>
    </>
  );
};

const ItemContainer = styled.div`
  .image {
    width: 80px;
  }
  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  margin-top: 20px;

  button {
    width: 30%;
  }

  .content {
    flex: 1;
    margin-left: 20px;
  }

  @media only screen and (max-width: 600px) {
    .image {
      width: 40px;
    }

    .item {
      justify-content: space-between;
    }

    .content {
      flex: 1;
    }

    .button {
      width: 100%;
    }
  }
`;

export default CartItemComponents;
