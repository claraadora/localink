import React from "react";
import axios from "axios";
import { setAlert } from "../alertActions";
import searchConstants from "../../constants/searchConstants";
import { Redirect } from "react-router-dom";

export const loadSearch = (search) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ search });
    const res = await axios.post("/search", body, config);

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
