const addToCartAction = (addedProduct) => async (dispatch, getState) => {
  dispatch({
    type: "ADD_TO_CART",
    payload: addedProduct,
  });
  localStorage.setItem(
    "cart-items",
    JSON.stringify(getState().shoppingCart.cartProducts)
  );
};

const removeFromCartAction = (removedProduct) => async (dispatch, getState) => {
  dispatch({
    type: "REMOVE_FROM_CART",
    payload: removedProduct,
  });
  localStorage.setItem(
    "cart-items",
    JSON.stringify(getState().shoppingCart.cartProducts)
  );
};

export { addToCartAction, removeFromCartAction };
