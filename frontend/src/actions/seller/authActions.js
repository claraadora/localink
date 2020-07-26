import authConstants from '../../constants/authConstants';
import profileConstants from '../../constants/profileConstants';
import { setAlert } from '../alertActions';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import { getCurrentProfile } from '../seller/profileActions';

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/business/auth');

    dispatch({
      type: authConstants.USER_LOADED,
      payload: res.data
    });

    dispatch(setAlert('Welcome! 🙌', 'success'));
  } catch (err) {
    dispatch({
      type: authConstants.AUTH_ERROR
    });
  }
  dispatch(setBackLoading());
};
//Encompasses request, success, and failure during logins.
export const login = ({ email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post('/business/auth', body, config); // api/auth

    dispatch({
      type: authConstants.LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
    dispatch(getCurrentProfile());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
    }

    dispatch({
      type: authConstants.LOGIN_FAILURE
    });

    dispatch(setBackLoading());
  }
};

//Register user
export const signup = ({
  name,
  shopName,
  email,
  password
}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({ name, shopName, email, password });

  try {
    const res = await axios.post('/business', body, config); // api/users

    dispatch({
      type: authConstants.SIGNUP_SUCCESS,
      payload: res.data // token
    });

    dispatch(
      setAlert(
        'Sign up successful. An activation link has been sent to your email.',
        'success'
      )
    );
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: authConstants.SIGNUP_FAILURE
    });
  }
  dispatch(setBackLoading());
};

//Defines the definite success of logout action
export const logout = () => dispatch => {
  dispatch({ type: authConstants.LOGOUT });
  dispatch({ type: profileConstants.CLEAR_PROFILE });
  dispatch(setBackLoading());
};

export const changePassword = ({
  oldPassword,
  newPassword
}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({ oldPassword, newPassword });
  try {
    const res = await axios.post(
      '/business/profile/account-settings-password',
      body,
      config
    );

    dispatch({
      type: authConstants.CHANGE_PASSWORD_SUCCESS,
      payload: res.data
    });

    dispatch({
      type: authConstants.USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
    }
    dispatch({
      type: authConstants.CHANGE_PASSWORD_FAILURE
    });
  }
  dispatch(setBackLoading());
};

export const changeEmail = ({ email }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({ email });
  try {
    const res = await axios.post(
      '/business/profile/account-settings-email',
      body,
      config
    );

    dispatch({
      type: authConstants.CHANGE_EMAIL_SUCCESS,
      payload: res.data
    });

    dispatch({
      type: authConstants.USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
    }
    dispatch({
      type: authConstants.CHANGE_EMAIL_FAILURE
    });
  }
  dispatch(setBackLoading());
};

export const forgotPassword = (email, isShopper) => async dispatch => {
  const body = {
    email: email,
    isShopper: isShopper
  };
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.post(`/reset_password/${email}`, body, config);

    dispatch({
      type: authConstants.FORGOT_PASSWORD
    });
    dispatch(
      setAlert('An email to reset password has been sent to you.', 'success')
    );
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(errors);
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
    }

    dispatch({
      type: authConstants.AUTH_ERROR
    });
  }
  dispatch(setBackLoading());
};

export const resetPassword = (password, segment) => async dispatch => {
  const body = {
    password: password
  };
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const endpoint = `/reset_password/${segment}`;
    console.log('segment' + segment);
    const res = await axios.post(endpoint, body, config);

    dispatch({
      type: authConstants.RESET_PASSWORD
    });
    dispatch(setAlert('Reset password success.', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(errors);
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
    }

    dispatch({
      type: authConstants.AUTH_ERROR
    });
  }
  dispatch(setBackLoading());
};

export const setBackLoading = () => dispatch => {
  dispatch({
    type: authConstants.SET_BACK_LOADING
  });
};

export const addUser = data => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify(data);

  try {
    const res = await axios.post('/business/user', body, config);
    dispatch({
      type: authConstants.ADD_USER,
      payload: res
    });

    dispatch(setAlert('User added.', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
    }
    console.log(errors);

    dispatch({
      type: profileConstants.PROFILE_ERROR
    });
  }
  dispatch(setBackLoading());
};

export const deleteUser = id => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.delete(`/business/user/${id}`, config);

    dispatch({
      type: authConstants.DELETE_USER,
      payload: id
    });

    dispatch(setAlert('User deleted.', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
    }

    dispatch({
      type: authConstants.PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
  dispatch(setBackLoading());
};

export const changeActiveStatus = userId => async dispatch => {
  try {
    const res = await axios.get(`/business/user/${userId}`);
    dispatch({
      type: authConstants.CHANGE_ACTIVE_STATUS,
      payload: userId
    });

    dispatch(setAlert('Active status changed.', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
    }
    console.log(errors);

    dispatch({
      type: authConstants.PROFILE_ERROR
    });
  }
  dispatch(setBackLoading());
};
