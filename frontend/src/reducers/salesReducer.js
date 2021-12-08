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

export { getActivatedSalesReducer };
