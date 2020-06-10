import React from "react";
import axios from "axios";
import { setAlert } from "../alertActions";
import searchConstants from "../../constants/searchConstants";
import { Redirect } from "react-router-dom";

export const loadSearch = () => async (dispatch) => {
  try {
    const res = await axios.get("/search");

    dispatch({
      type: searchConstants.SEARCH_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: searchConstants.SEARCH_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
