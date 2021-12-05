import axios from "axios";

const orderPricesActions = (orderPrices) => async (dispatch) => {
  dispatch({
    type: "SAVE_ORDER_PRICES",
    payload: orderPrices,
  });
};

const shippingDetailsActions = (shippingDeatils) => async (dispatch) => {
  dispatch({
    type: "SAVE_SHIPPING_DETAILS",
    payload: shippingDeatils,
  });
};

const createNewOrderAction = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "ORDER_CREATE_REQUEST",
    });

    const {
      user: { loggedUser },
    } = getState();

    const configuration = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loggedUser.token}`,
      },
    };

    const { data } = await axios.post("/api/orders/new", order, configuration);

    dispatch({
      type: "ORDER_CREATE_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "ORDER_CREATE_FAILURE",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

const getOrderDetailsAction = (orderId) => async (dispatch) => {
  try {
    dispatch({
      type: "ORDER_DETAILS_REQUEST",
    });

    const { data } = await axios.get(`/api/orders/get-details/${orderId}`);

    dispatch({
      type: "ORDER_DETAILS_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "ORDER_DETAILS_FAILURE",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

const getCurrentUserOrdersAction =
  (pageNumber = "") =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: "CURRENT_USER_ORDERS_REQUEST",
      });

      const {
        user: { loggedUser },
      } = getState();

      const configuration = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loggedUser.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/orders/current-user-orders?page=${pageNumber}`,
        configuration
      );

      console.log(data);

      dispatch({
        type: "CURRENT_USER_ORDERS_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "CURRENT_USER_ORDERS_FAILURE",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response,
      });
    }
  };

export {
  orderPricesActions,
  shippingDetailsActions,
  createNewOrderAction,
  getOrderDetailsAction,
  getCurrentUserOrdersAction,
};
