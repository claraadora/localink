import authConstants from "../constants/authConstants";
import profileConstants from "../constants/profileConstants";
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
    const res = await axios.get("/business/auth");

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
    const res = await axios.post("/business/auth", body, config); // api/auth

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
  dispatch({ type: profileConstants.CLEAR_PROFILE });
};

//Register user
export const signup = ({ shopName, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ shopName, email, password });
  console.log("here" + body);
  console.log(shopName);

  try {
    const res = await axios.post("/business", body, config); // api/users

    dispatch({
      type: authConstants.SIGNUP_SUCCESS,
      payload: res.data, // token
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.message, "danger")));
    }
    dispatch({
      type: authConstants.SIGNUP_FAILURE,
    });
  }
};
