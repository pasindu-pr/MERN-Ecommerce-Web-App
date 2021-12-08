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

export { getActivatedSaleAction };
