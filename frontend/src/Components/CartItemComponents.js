import React from "react";
import { Item, Button } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { removeFromCartAction } from "../actions/shoppingCartActions";

const CartItemComponents = ({ productId, name, quantity, price, image }) => {
  const dispatch = useDispatch();

  const removedClickHandler = () => {
    dispatch(removeFromCartAction(productId));
  };

  return (
    <>
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
    </>
  );
};

export default CartItemComponents;
