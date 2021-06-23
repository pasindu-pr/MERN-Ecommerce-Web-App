import axios from "axios";

const dashBoardDetailsAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: "DASHBOARD_DETAILS_REQUEST",
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

    const { data } = await axios.get("/api/dashboard", configuration);

    dispatch({
      type: "DASHBOARD_DETAILS_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "DASHBOARD_DETAILS_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

const dashBoardOrdersAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: "DASHBOARD_ORDERS_REQUEST",
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

    const { data } = await axios.get("/api/dashboard/orders", configuration);

    dispatch({
      type: "DASHBOARD_ORDERS_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "DASHBOARD_ORDERS_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

const dashBoardUsersAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: "DASHBOARD_USERS_REQUEST",
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

    const { data } = await axios.get("/api/dashboard/users", configuration);

    dispatch({
      type: "DASHBOARD_USERS_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "DASHBOARD_USERS_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

const dashBoardProductsAction = (page = "") => async (dispatch, getState) => {
  try {
    dispatch({
      type: "DASHBOARD_PRODUCTS_REQUEST",
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
      `/api/dashboard/products?page=${page}`,
      configuration
    );

    dispatch({
      type: "DASHBOARD_PRODUCTS_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "DASHBOARD_PRODUCTS_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export {
  dashBoardDetailsAction,
  dashBoardOrdersAction,
  dashBoardUsersAction,
  dashBoardProductsAction,
};
