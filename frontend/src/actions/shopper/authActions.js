import authConstants from "../../constants/authConstants";
import profileConstants from "../../constants/profileConstants";
import { setAlert } from "../alertActions";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import { getCurrentProfile } from "../shopper/profileActions";

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

    dispatch(getCurrentProfile());

    dispatch(setAlert("Welcome! 🙌", "success"));
  } catch (err) {
    dispatch({
      type: authConstants.AUTH_ERROR,
    });
  }
  dispatch(setBackLoading());
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
    console.log(errors);
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
    }

    dispatch({
      type: authConstants.LOGIN_FAILURE,
    });

    dispatch(setBackLoading());
  }
};

export const loginWithGoogle = (response) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const tokenId = response.tokenId;

  const body = JSON.stringify({ tokenId });

  try {
    const res = await axios.post("/auth/google-login ", body, config); // api/auth

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
  dispatch(setBackLoading());
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

    dispatch(
      setAlert(
        "Sign up successful. An activation link has been sent to your email.",
        "success"
      )
    );
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
  dispatch(setBackLoading());
};

//Defines the definite success of logout action
export const logout = () => (dispatch) => {
  dispatch({ type: authConstants.LOGOUT });
  dispatch({ type: profileConstants.CLEAR_PROFILE });
  dispatch(setBackLoading());
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
  dispatch(setBackLoading());
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
  dispatch(setBackLoading());
};

export const forgotPassword = (email, isShopper) => async (dispatch) => {
  const body = {
    email: email,
    isShopper: isShopper,
  };
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(`/reset_password/${email}`, body, config);

    dispatch({
      type: authConstants.FORGOT_PASSWORD,
    });
    dispatch(
      setAlert("An email to reset password has been sent to you.", "success")
    );
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(errors);
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
    }

    dispatch({
      type: authConstants.AUTH_ERROR,
    });
  }
  dispatch(setBackLoading());
};

export const resetPassword = (password, segment) => async (dispatch) => {
  const body = {
    password: password,
  };
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const endpoint = `/reset_password/${segment}`;
    console.log("endpoint" + endpoint);
    const res = await axios.post(endpoint, body, config);

    dispatch({
      type: authConstants.RESET_PASSWORD,
    });
    dispatch(setAlert("Reset password success.", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(errors);
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
    }

    dispatch({
      type: authConstants.AUTH_ERROR,
    });
  }
  dispatch(setBackLoading());
};

export const setBackLoading = () => (dispatch) => {
  dispatch({
    type: authConstants.SET_BACK_LOADING,
  });
};
