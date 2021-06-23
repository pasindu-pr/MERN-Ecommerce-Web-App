const dashBoardReducer = (state = { details: {} }, action) => {
  switch (action.type) {
    case "DASHBOARD_DETAILS_REQUEST":
      return { loading: true, success: false, state: { details: {} } };

    case "DASHBOARD_DETAILS_SUCCESS":
      return { loading: false, success: true, details: action.payload };

    case "DASHBOARD_DETAILS_FAIL":
      return { loading: false, success: false, error: action.payload };

    default:
      return state;
  }
};

const dashBoardOrdersReducer = (state = { orders: {} }, action) => {
  switch (action.type) {
    case "DASHBOARD_ORDERS_REQUEST":
      return { loading: true, success: false, state: { orders: {} } };

    case "DASHBOARD_ORDERS_SUCCESS":
      return { loading: false, success: true, orders: action.payload };

    case "DASHBOARD_ORDERS_FAIL":
      return { loading: false, success: false, error: action.payload };

    default:
      return state;
  }
};

const dashBoardProductsReducer = (state = { products: {} }, action) => {
  switch (action.type) {
    case "DASHBOARD_PRODUCTS_REQUEST":
      return { loading: true, success: false, state: { products: {} } };

    case "DASHBOARD_PRODUCTS_SUCCESS":
      return {
        loading: false,
        success: true,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
      };

    case "DASHBOARD_PRODUCTS_FAIL":
      return { loading: false, success: false, error: action.payload };

    default:
      return state;
  }
};

const dashBoardUsersReducer = (state = { users: {} }, action) => {
  switch (action.type) {
    case "DASHBOARD_USERS_REQUEST":
      return { loading: true, success: false, state: { users: {} } };

    case "DASHBOARD_USERS_SUCCESS":
      return { loading: false, success: true, users: action.payload };

    case "DASHBOARD_USERS_FAIL":
      return { loading: false, success: false, error: action.payload };

    default:
      return state;
  }
};

export {
  dashBoardReducer,
  dashBoardOrdersReducer,
  dashBoardProductsReducer,
  dashBoardUsersReducer,
};
