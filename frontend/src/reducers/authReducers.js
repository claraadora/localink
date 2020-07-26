import authConstants from "../constants/authConstants";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: {
    users: [],
  },
  emailSent: false,
};

export const auth = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case authConstants.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case authConstants.SIGNUP_SUCCESS:
      return {
        ...state,
        ...payload,
        loading: false,
      };
    case authConstants.LOGIN_SUCCESS:
    case authConstants.CHANGE_PASSWORD_SUCCESS:
    case authConstants.CHANGE_EMAIL_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case authConstants.AUTH_ERROR:
    case authConstants.SIGNUP_FAILURE:
    case authConstants.LOGIN_FAILURE:
    case authConstants.LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    case authConstants.CHANGE_EMAIL_FAILURE:
    case authConstants.CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case authConstants.FORGOT_PASSWORD:
      return {
        ...state,
        loading: false,
        emailSent: true,
      };
    case authConstants.RESET_PASSWORD:
      return {
        ...state,
        loading: false,
      };
    case authConstants.SET_BACK_LOADING:
      return {
        ...state,
        loading: true,
      };
    case authConstants.CHANGE_ACTIVE_STATUS:
      return {
        ...state,
        loading: false,
        user: {
          users: state.user.users.map((user) => {
            if (user._id === payload) {
              const bool = user.isAccountActive;
              user.isAccountActive = !bool;
            }
            return user;
          }),
        },
      };
    default:
      return state;
  }
};

export default auth;
