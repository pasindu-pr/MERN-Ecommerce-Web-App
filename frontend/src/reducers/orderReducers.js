const orderPriceReducer = (state = {}, action) => {
  switch (action.type) {
    case "SAVE_ORDER_PRICES":
      return { orderPrices: action.payload };

    default:
      return state;
  }
};

const shippingDetailsReducer = (state = { shippingDetails: {} }, action) => {
  switch (action.type) {
    case "SAVE_SHIPPING_DETAILS":
      return { shippingDetails: action.payload };

    default:
      return state;
  }
};

const createNewOrderReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case "ORDER_CREATE_REQUEST":
      return { loading: true, order: {} };

    case "ORDER_CREATE_SUCCESS":
      return { loading: false, success: true, order: action.payload };

    case "ORDER_CREATE_FAILURE":
      return { loading: false, success: false, error: action.payload };

    default:
      return state;
  }
};

const orderDetailsReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case "ORDER_DETAILS_REQUEST":
      return { loading: true, order: {} };

    case "ORDER_DETAILS_SUCCESS":
      return { loading: false, success: true, order: action.payload };

    case "ORDER_DETAILS_FAILURE":
      return { loading: false, success: false, error: action.payload };

    default:
      return state;
  }
};

const currentUserOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case "CURRENT_USER_ORDERS_REQUEST":
      return { loading: true, orders: {} };

    case "CURRENT_USER_ORDERS_SUCCESS":
      return {
        loading: false,
        success: true,
        orders: action.payload.orders,
        pages: action.payload.pages,
      };

    case "CURRENT_USER_ORDERS_FAILURE":
      return { loading: false, success: false, error: action.payload };

    default:
      return state;
  }
};

export {
  orderPriceReducer,
  shippingDetailsReducer,
  createNewOrderReducer,
  orderDetailsReducer,
  currentUserOrdersReducer,
};
