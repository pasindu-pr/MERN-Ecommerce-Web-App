import axios from "axios";

const getPublishableKeyAction = () => async (dispatch) => {
  try {
    dispatch({
      type: "PUBLISHABLE_KEY_REQUEST",
    });

    const { data } = await axios.get("/api/payments/stripe/get-publish-key");

    dispatch({
      type: "PUBLISHABLE_KEY_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "PUBLISHABLE_KEY_FAILURE",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

const getPaymentIntentAction = (amount) => async (dispatch) => {
  try {
    dispatch({
      type: "PAYMENT_INTENT_REQUEST",
    });

    const configuration = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    console.log(amount);

    const { data } = await axios.post(
      "/api/payments/stripe/payment-intent",
      { amount },
      configuration
    );

    dispatch({
      type: "PAYMENT_INTENT_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "PAYMENT_INTENT_FAILURE",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export { getPublishableKeyAction, getPaymentIntentAction };
