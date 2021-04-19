import axios from "axios";

const getCategoriesAction = () => async (dispatch) => {
  try {
    dispatch({
      type: "LATEST_CATEGORIES_REQUEST",
    });

    const { data } = await axios.get("/api/categories");

    dispatch({
      type: "LATEST_CATEGORIES_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "LATEST_CATEGORIES_REQUEST_FAILURE",
      payload: error,
    });
  }
};

const getLatestProductsAction = () => async (dispatch) => {
  try {
    dispatch({
      type: "LATEST_PRODUCTS_REQUEST",
    });

    const { data } = await axios.get("/api/products/latest");

    dispatch({
      type: "LATEST_PRODUCTS_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "LATEST_PRODUCTS_REQUEST_FAILURE",
      payload: error,
    });
  }
};

const getProductDetailsAction = (product_id) => async (dispatch) => {
  try {
    dispatch({
      type: "LATEST_PRODUCTS_DETAILS_REQUEST",
    });

    const { data } = await axios.get(`/api/products/${product_id}`);

    dispatch({
      type: "LATEST_PRODUCTS_DETAILS_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "LATEST_PRODUCTS_DETAILS_REQUEST_FAILURE",
      payload: error,
    });
  }
};

const getProductsByCategoriesAction = (category) => async (dispatch) => {
  try {
    dispatch({
      type: "PRODUCTS_BY_CAT_REQUEST",
    });

    const { data } = await axios.get(`/api/products/cat/${category}`);

    dispatch({
      type: "PRODUCTS_BY_CAT_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "PRODUCTS_BY_CAT_FAILURE",
      payload: error,
    });
  }
};

const createNewProductAction = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "PRODUCT_CREATE_REQUEST",
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
      "/api/products/new",
      product,
      configuration
    );

    dispatch({
      type: "PRODUCT_CREATE_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "PRODUCT_CREATE_FAILURE",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

const addProductsToDeleteAction = (productId) => async (dispatch) => {
  dispatch({
    type: "PRODUCT_CHECKED",
    payload: productId,
  });
};

const removeProductsToDeleteAction = (productId) => async (dispatch) => {
  dispatch({
    type: "PRODUCT_UNCHECKED",
    payload: productId,
  });
};

const deleteProductsAction = (products) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "PRODUCT_DELETE_REQUSET",
    });

    const {
      user: { loggedUser },
    } = getState();

    const configuration = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${loggedUser.token}`,
      },
    };

    const { data } = await axios.delete(
      "/api/products",
      { data: products },
      configuration
    );

    dispatch({
      type: "PRODUCT_DELETE_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "PRODUCT_DELETE_FAILURE",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export {
  getCategoriesAction,
  getLatestProductsAction,
  getProductDetailsAction,
  getProductsByCategoriesAction,
  createNewProductAction,
  addProductsToDeleteAction,
  removeProductsToDeleteAction,
  deleteProductsAction,
};
