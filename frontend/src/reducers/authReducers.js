import authConstants from "../constants/authConstants";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
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
    default:
      return state;
  }
};

export default auth;
