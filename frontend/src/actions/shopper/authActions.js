import authConstants from "../../constants/authConstants";
import profileConstants from "../../constants/profileConstants";
import { setAlert } from "../alertActions";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/auth");

    dispatch({
      type: authConstants.USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: authConstants.AUTH_ERROR,
    });
  }
};
//Encompasses request, success, and failure during logins.
export const login = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });
  console.log("body" + body);

  try {
    const res = await axios.post("/auth", body, config); // api/auth

    dispatch({
      type: authConstants.LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
    }

    dispatch({
      type: authConstants.LOGIN_FAILURE,
    });
  }
};

//Register user
export const signup = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post("/", body, config); // api/users

    dispatch({
      type: authConstants.SIGNUP_SUCCESS,
      payload: res.data, // token
    });
    dispatch(loadUser());
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: authConstants.SIGNUP_FAILURE,
    });
  }
};

//Defines the definite success of logout action
export const logout = () => (dispatch) => {
  dispatch({ type: authConstants.LOGOUT });
  dispatch({ type: profileConstants.CLEAR_PROFILE });
};

export const changePassword = ({ oldPassword, newPassword }) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ oldPassword, newPassword });
  try {
    const res = await axios.post(
      "/profile/account-settings-password",
      body,
      config
    );

    dispatch({
      type: authConstants.CHANGE_PASSWORD_SUCCESS,
      payload: res.data,
    });

    dispatch({
      type: authConstants.USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
    }
    dispatch({
      type: authConstants.CHANGE_PASSWORD_FAILURE,
    });
  }
};

export const changeEmail = ({ email }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email });
  try {
    const res = await axios.post(
      "/profile/account-settings-email",
      body,
      config
    );

    dispatch({
      type: authConstants.CHANGE_EMAIL_SUCCESS,
      payload: res.data,
    });

    dispatch({
      type: authConstants.USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
    }
    dispatch({
      type: authConstants.CHANGE_EMAIL_FAILURE,
    });
  }
};
