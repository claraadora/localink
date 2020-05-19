import userConstants from "../constants/userConstants";
import { setAlert } from "../actions/alertActions";
import { createBrowserHistory } from "history";
import axios from "axios";

const history = createBrowserHistory();

//Encompasses request, success, and failure during logins.
export const login = (username, password) => {
  return (dispatch) => {
    dispatch(requestLogin({ username }));

    //Data
    let apiEndpoint = "auths";
    let payload = {
      username,
      password,
    };

    // userService.post(apiEndpoint, payload).then(
    //   (response) => {
    //     localStorage.setItem("token", response.data.token);
    //     localStorage.setItem("auth", response.data.auth);
    //     dispatch(successLogin(response.data));
    //     history.push("/");
    //   },
    //   (error) => {
    //     dispatch(failureLogin(error));
    //     dispatch(alertActions.error(error));
    //   }
    // );
  };

  function requestLogin(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function successLogin(user) {
    return {
      type: userConstants.LOGIN_SUCCESS,
      auth: user.auth,
      token: user.token,
    };
  }
  function failureLogin(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
};

//Defines the definite success of logout action
export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
    dispatch(successLogout());
    history.push("/");
  };
  function successLogout() {
    return {
      type: userConstants.LOGOUT,
      auth: false,
      token: "",
    };
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
    const res = await axios.post("/api/users", body, config);

    dispatch({
      type: userConstants.SIGNUP_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.message, "danger")));
    }
    dispatch({
      type: userConstants.SIGNUP_FAILURE,
    });
  }
};

export const signin = ({ name, email, password }) => async (dispatch) => {
  dispatch({ type: userConstants.SIGNIN_REQUEST });
};
