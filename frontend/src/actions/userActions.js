import { userConstants } from "../constants/userConstants";
import { alertActions } from "./actions/alertActions";
import { createBrowserHistory } from "history";
import axios from "axios";

export const userActions = {
  login,
  logout,
  signin,
  signup,
  getAll,
};

const history = createBrowserHistory();

//Encompasses request, success, and failure during logins.
function login(username, password) {
  return (dispatch) => {
    dispatch(requestLogin({ username }));

    //Data
    let apiEndpoint = "auths";
    let payload = {
      username,
      password,
    };

    userService.post(apiEndpoint, payload).then(
      (response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("auth", response.data.auth);
        dispatch(successLogin(response.data));
        history.push("/");
      },
      (error) => {
        dispatch(failureLogin(error));
        dispatch(alertActions.error(error));
      }
    );
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
}

//Defines the definite success of logout action
function logout() {
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
}

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
    dispatch({
      type: userConstants.SIGNUP_FAILURE,
    });
  }
};

function getAll() {
  return (dispatch) => {
    dispatch(request());

    userService.getAll().then(
      (users) => dispatch(success(users)),
      (error) => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };

  function request() {
    return { type: userConstants.GETALL_REQUEST };
  }
  function success(users) {
    return { type: userConstants.GETALL_SUCCESS, users };
  }
  function failure(error) {
    return { type: userConstants.GETALL_FAILURE, error };
  }
}
