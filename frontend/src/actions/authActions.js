import authConstants from "../constants/authConstants";
import { setAlert } from "../actions/alertActions";
import { createBrowserHistory } from "history";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

const history = createBrowserHistory();

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth");

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
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application.json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/business/login", body, config); // api/auth

    dispatch({
      type: authConstants.LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: authConstants.LOGIN_FAILURE,
    });
  }
};

//Defines the definite success of logout action
export const logout = () => (dispatch) => {
  dispatch({ type: authConstants.LOGOUT });
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
    const res = await axios.post("/business/signup", body, config); // api/users

    dispatch({
      type: authConstants.SIGNUP_SUCCESS,
      payload: res.data, // token
    });

    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.message, "danger")));
    }
    dispatch({
      type: authConstants.SIGNUP_FAILURE,
    });
  }
};
