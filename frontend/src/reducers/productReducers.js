const getCategoriesReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case "LATEST_CATEGORIES_REQUEST":
      return { loading: true, categories: [] };

    case "LATEST_CATEGORIES_SUCCESS":
      return { loading: false, success: true, categories: action.payload };

    case "LATEST_CATEGORIES_REQUEST_FAILURE":
      return { loading: false, success: false, error: action.payload };

    default:
      return state;
  }
};

const getLatestProductsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case "LATEST_PRODUCTS_REQUEST":
      return { loading: true, products: [] };

    case "LATEST_PRODUCTS_SUCCESS":
      return { loading: false, success: true, products: action.payload };

    case "LATEST_PRODUCTS_REQUEST_FAILURE":
      return { loading: false, success: false, error: action.payload };

    default:
      return state;
  }
};

const getProductsByCategoryReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case "PRODUCTS_BY_CAT_REQUEST":
      return { loading: true, products: [] };

    case "PRODUCTS_BY_CAT_SUCCESS":
      return {
        loading: false,
        success: true,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
      };

    case "PRODUCTS_BY_CAT_FAILURE":
      return { loading: false, success: false, error: action.payload };

    default:
      return state;
  }
};

const getProductsDetails = (state = { product: {} }, action) => {
  switch (action.type) {
    case "LATEST_PRODUCTS_DETAILS_REQUEST":
      return { loading: true, product: {} };

    case "LATEST_PRODUCTS_DETAILS_SUCCESS":
      return { loading: false, success: true, product: action.payload };

    case "LATEST_PRODUCTS_DETAILS_REQUEST_FAILURE":
      return { loading: false, success: false, error: action.payload };

    default:
      return state;
  }
};

const createProductsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case "PRODUCT_CREATE_REQUEST":
      return { loading: true, product: {} };

    case "PRODUCT_CREATE_SUCCESS":
      return { loading: false, success: true, product: action.payload };

    case "PRODUCT_CREATE_FAILURE":
      return { loading: false, success: false, error: action.payload };

    case "PRODUCT_CREATE_RESET":
      return (state = { product: {} });

    default:
      return state;
  }
};

const productsToDeleteReducer = (state = [], action) => {
  switch (action.type) {
    case "PRODUCT_CHECKED":
      const addedId = action.payload;
      return (state = [...state, addedId]);

    case "PRODUCT_UNCHECKED":
      const removedId = action.payload;
      return (state = state.filter((id) => id !== removedId));

    default:
      return state;
  }
};

const deleteProductReducer = (state = {}, action) => {
  switch (action.type) {
    case "PRODUCT_DELETE_REQUSET":
      return { loading: true, state: {} };

    case "PRODUCT_DELETE_SUCCESS":
      return { loading: false, success: true, state: action.payload };

    case "PRODUCT_DELETE_FAILURE":
      return { loading: false, success: false, state: action.payload };

    case "PRODUCTS_DELETE_RESET":
      return (state = {});

    default:
      return state;
  }
};

export {
  getLatestProductsReducer,
  getCategoriesReducer,
  getProductsByCategoryReducer,
  getProductsDetails,
  createProductsReducer,
  productsToDeleteReducer,
  deleteProductReducer,
};
