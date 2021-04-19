import axios from "axios";

const userLoginAction = (loginInfo) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "USER_LOGIN_REQUEST",
    });

    const configuration = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/login",
      loginInfo,
      configuration
    );

    dispatch({
      type: "USER_LOGIN_SUCCESS",
      payload: data,
    });

    localStorage.setItem(
      "logged-user",
      JSON.stringify(getState().user.loggedUser)
    );
  } catch (error) {
    dispatch({
      type: "USER_LOGIN_ERROR",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

const userRegisterAction = (user) => async (dispatch) => {
  try {
    dispatch({
      type: "USER_REGISTER_REQUEST",
    });

    const configuration = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/register",
      user,
      configuration
    );

    dispatch({
      type: "USER_REGISTER_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "USER_REGISTER_ERROR",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export { userRegisterAction, userLoginAction };
