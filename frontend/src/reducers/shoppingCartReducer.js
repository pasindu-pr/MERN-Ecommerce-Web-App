const shoppingCartReducer = (state = { cartProducts: [] }, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const addedProduct = action.payload;
      //Check if item is already on the cart
      const productAlreadyExist = state.cartProducts.find(
        (cartProduct) => cartProduct._id === addedProduct._id
      );

      if (productAlreadyExist) {
        return {
          ...state,
          cartProducts: [
            ...state.cartProducts.map((cartProduct) => {
              if (cartProduct._id === addedProduct._id) {
                return {
                  ...cartProduct,
                  quantity: cartProduct.quantity + addedProduct.quantity,
                };
              } else {
                return cartProduct;
              }
            }),
          ],
        };
      } else {
        return {
          ...state,
          cartProducts: [...state.cartProducts, addedProduct],
        };
      }

    case "REMOVE_FROM_CART":
      const removedProductID = action.payload;

      return {
        ...state,
        cartProducts: [
          ...state.cartProducts.filter((product) => {
            return removedProductID !== product._id;
          }),
        ],
      };

    default:
      return state;
  }
};

export { shoppingCartReducer };
