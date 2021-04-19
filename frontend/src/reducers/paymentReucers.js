const getPublishableKeyReducer = (state = { key: {} }, action) => {
  switch (action.type) {
    case "PUBLISHABLE_KEY_REQUEST":
      return { loading: true, success: false, key: {} };

    case "PUBLISHABLE_KEY_SUCCESS":
      return { loading: false, success: true, key: action.payload };

    case "PUBLISHABLE_KEY_FAILURE":
      return { loading: false, success: false, error: action.payload };

    default:
      return state;
  }
};

const getPaymentIntentReducer = (state = {}, action) => {
  switch (action.type) {
    case "PAYMENT_INTENT_REQUEST":
      return { loading: true, success: false, key: {} };

    case "PAYMENT_INTENT_SUCCESS":
      return { loading: false, success: true, paymentIntent: action.payload };

    case "PAYMENT_INTENT_FAILURE":
      return { loading: false, success: false, error: action.payload };

    default:
      return state;
  }
};

export { getPublishableKeyReducer, getPaymentIntentReducer };
