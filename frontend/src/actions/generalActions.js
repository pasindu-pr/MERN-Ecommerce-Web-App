import jwtDecode from "jwt-decode";

const checkAuthAction = () => async (dispatch, getState) => {
  const {
    user: { loggedUser },
  } = getState();

  // if (loggedUser.token) {
  const { exp } = jwtDecode(loggedUser.token);
  const expirationTime = exp * 1000 - 60000;

  if (Date.now() > expirationTime) {
    localStorage.removeItem("logged-user");
    dispatch({
      type: "USER_LOGOUT",
    });
  }
  // }
};

const userLogoutAction = () => async (dispatch) => {
  dispatch({
    type: "USER_LOGOUT",
  });

  localStorage.removeItem("logged-user");
};

export { checkAuthAction, userLogoutAction };
