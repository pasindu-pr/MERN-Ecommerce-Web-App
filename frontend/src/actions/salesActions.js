import axios from "axios";

const getActivatedSaleAction = () => async (dispatch) => {
  try {
    dispatch({
      type: "ACTIVATED_SALE_REQUEST",
    });

    const { data } = await axios.get("/api/sales/");

    dispatch({
      type: "ACTIVATED_SALE_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "ACTIVATED_SALE_FAIL",
      payload: error,
    });
  }
};

const createSaleAction = (saleInfo) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "START_SALE_REQUEST",
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

    const { data } = await axios.post(
      `/api/sales/`,
      {
        saleName: saleInfo.saleName,
        discountPrecentage: saleInfo.discountPrecentage,
      },
      configuration
    );

    dispatch({
      type: "START_SALE_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "START_SALE_FAIL",
      payload: error,
    });
  }
};

const stopSaleAction = (sale) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "STOP_SALE_REQUEST",
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

    const { data } = await axios.put(
      `/api/sales/`,
      { saleId: sale._id },
      configuration
    );

    dispatch({
      type: "STOP_SALE_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "STOP_SALE_FAIL",
      payload: error,
    });
  }
};

export { getActivatedSaleAction, createSaleAction, stopSaleAction };
