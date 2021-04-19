const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_REGISTER_REQUEST":
      return { loading: true, success: false, registereduser: {} };

    case "USER_REGISTER_SUCCESS":
      return { loading: false, success: true, registereduser: action.payload };

    case "USER_REGISTER_ERROR":
      return { loading: false, success: false, error: action.payload };

    default:
      return state;
  }
};

const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_LOGIN_REQUEST":
      return { loading: true, success: false, loggedUser: {} };

    case "USER_LOGIN_SUCCESS":
      return { loading: false, success: true, loggedUser: action.payload };

    case "USER_LOGIN_ERROR":
      return { loading: false, success: false, error: action.payload };

    case "USER_LOGOUT":
      return (state = {});

    default:
      return state;
  }
};

export { userRegisterReducer, userLoginReducer };
