import userConstants from "../constants/userConstants";
import Axios from "axios";

export const changePassword = ({ oldPassword, newPassword }) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ oldPassword, newPassword });
  try {
      const res = await Axios.post("/business/profile/account-settings-password", body, config); 

      dispatch({
          type: userConstants.CHANGE_PASSWORD_SUCCESS, 
          payload: res.data, 
      });
  } catch(err) {
      const errors = err.response.data.errors; 

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: userActions.CHANGE_PASSWORD_FAILURE,
      });
  }
};

export const changeEmail = ({ email }) => (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ email });
    try {
        const res = await Axios.post("/business/profile/account-settings-password", body, config); 
  
        dispatch({
            type: userConstants.CHANGE_PASSWORD_SUCCESS, 
            payload: res.data, 
        });
    } catch(err) {
        const errors = err.response.data.errors; 
  
        if (errors) {
          errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }
        dispatch({
          type: userActions.CHANGE_PASSWORD_FAILURE,
        });
    }
  };
  

