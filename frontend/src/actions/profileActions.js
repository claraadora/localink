import axios from "axios";
import { setAlert } from "./alertActions";
import profileConstants from "../constants/profileConstants";

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/business/profile/me");

    dispatch({
      type: profileConstants.GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: profileConstants.PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/business/profile", formData, config);

    dispatch({
      type: profileConstants.GET_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert(edit ? "Profile Updated" : "Profile Created"), "success");

    if (!edit) {
      history.push("/dashboard");
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: profileConstants.PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

export const addProduct = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/business/product", formData, config);

    dispatch({
      type: profileConstants.UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Product Added", "success"));
    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: profileConstants.PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.delete(`/business/product/${id}`, config);

    dispatch({
      type: profileConstants.UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Product deleted", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: profileConstants.PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

/* edit product
post to /business/product/id
*/

/* change email 
post to /business/profile/account-settings-email
*/

/* change password 
post to /business/profile/account-settings-password
*/

/* create reviews
post /review
*/

/* search
post /search
*/
