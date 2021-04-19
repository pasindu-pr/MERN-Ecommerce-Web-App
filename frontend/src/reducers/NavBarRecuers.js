const navBarReducer = (state = true, action) => {
  switch (action.type) {
    case "TOGGLE_NAV_BAR":
      return !state;

    default:
      return state;
  }
};

export { navBarReducer };
