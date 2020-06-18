import axios from "axios";
import { setAlert } from "../alertActions";
import searchConstants from "../../constants/searchConstants";
import { dynamicSort } from "../../utils/sort";

export const loadSearch = (search, service) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ search, service });
    const res = await axios.post("/search", body, config);

    dispatch({
      type: searchConstants.CLEAR_SEARCH,
    });

    dispatch({
      type: searchConstants.SEARCH_REQUEST,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
    }
    dispatch({
      type: searchConstants.SEARCH_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

export const reorderSearch = (sortBy, order, items) => (dispatch) => {
  const sortedSearch = items.sort(dynamicSort(sortBy, order));
  dispatch({
    type: searchConstants.REORDER_SEARCH,
    payload: {
      productArray: sortedSearch,
      sortedBy: sortBy,
    },
  });
};

export const clearSearch = () => (dispatch) => {
  dispatch({
    type: searchConstants.CLEAR_SEARCH,
  });
};
