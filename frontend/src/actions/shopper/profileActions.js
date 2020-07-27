import React from "react";
import axios from "axios";
import { setAlert } from "../alertActions";
import profileConstants from "../../constants/profileConstants";

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/profile/me");

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

export const setBackLoading = () => (dispatch) => {
  dispatch({
    type: "SET_BACK_LOADING",
  });
};
