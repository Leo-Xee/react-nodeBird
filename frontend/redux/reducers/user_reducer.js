const initialState = {
  isLoggedIn: false,
  user: null,
  signUpData: {},
  loginDate: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN_USER":
      return {
        ...state,
        isLoggedIn: true,
      };
    case "LOG_OUT_USER":
      return {
        ...state,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default userReducer;
