const getActivatedSalesReducer = (initialState = {}, action) => {
  switch (action.type) {
    case "ACTIVATED_SALE_REQUEST":
      return { loading: true, success: false, state: { details: {} } };

    case "ACTIVATED_SALE_SUCCESS":
      return { loading: false, success: true, sale: action.payload };

    case "ACTIVATED_SALE_FAIL":
      return { loading: false, success: false, error: action.payload };

    default:
      return initialState;
  }
};

const startSaleReducer = (initialState = {}, action) => {
  switch (action.type) {
    case "START_SALE_REQUEST":
      return { loading: true, success: false, state: { details: {} } };

    case "START_SALE_SUCCESS":
      return { loading: false, success: true, sale: action.payload.message };

    case "START_SALE_FAIL":
      return { loading: false, success: false, error: action.payload };

    case "START_SALE_RESET":
      return initialState;

    default:
      return initialState;
  }
};

const stopSaleReducer = (initialState = {}, action) => {
  switch (action.type) {
    case "STOP_SALE_REQUEST":
      return { loading: true, success: false, state: { details: {} } };

    case "STOP_SALE_SUCCESS":
      return { loading: false, success: true, sale: action.payload.message };

    case "STOP_SALE_FAIL":
      return { loading: false, success: false, error: action.payload };

    case "STOP_SALE_RESET":
      return initialState;

    default:
      return initialState;
  }
};

export { getActivatedSalesReducer, startSaleReducer, stopSaleReducer };
