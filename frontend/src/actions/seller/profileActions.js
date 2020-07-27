import React from "react";
import axios from "axios";
import { setAlert } from "../alertActions";
import profileConstants from "../../constants/profileConstants";

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
  dispatch(setBackLoading());
};

export const createProfile = (formData, edit = false) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/business/profile", formData, config);

    dispatch({
      type: profileConstants.UPDATE_PROFILE,
      payload: res.data,
    });

    if (edit) {
      console.log("edit");
    } else {
      console.log("create");
    }
    dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
    }

    dispatch({
      type: profileConstants.PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
  dispatch(setBackLoading());
};

export const addProduct = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(`/business/product`, formData, config);

    dispatch({
      type: profileConstants.UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Product Added", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
    }

    dispatch({
      type: profileConstants.PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
  dispatch(setBackLoading());
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
      errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
    }

    dispatch({
      type: profileConstants.PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
  dispatch(setBackLoading());
};

export const addUser = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(data);

  try {
    const res = await axios.post("/business/user", body, config);
    dispatch({
      type: profileConstants.ADD_USER,
      payload: res,
    });

    dispatch(setAlert("", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
    }
    console.log(errors);

    dispatch({
      type: profileConstants.ADD_USER_ERROR,
    });
  }
  dispatch(setBackLoading());
};

export const setBackLoading = () => (dispatch) => {
  dispatch({
    type: "SET_BACK_LOADING",
  });
};
