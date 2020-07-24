import axios from "axios";
import { setAlert } from "../alertActions";
import searchConstants from "../../constants/searchConstants";
import { dynamicSort } from "../../utils/sort";

export const loadSearch = (search, service) => async (dispatch) => {
  dispatch(setRenderLocation());
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ search, service });
    const res = await axios.post("/search", body, config);

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

export const loadRoute = () => (dispatch) => {
  dispatch(setRenderRoute());

  dispatch({
    type: searchConstants.CLEAR_SEARCH,
  });

  dispatch({
    type: searchConstants.LOAD_ROUTE,
  });
};

export const loadDirectionSteps = (directionSteps) => (dispatch) => {
  dispatch({
    type: searchConstants.LOAD_DIRECTION_STEPS,
    payload: directionSteps,
  });
};

export const updateDirectionSteps = (directionStep) => (dispatch) => {
  dispatch({
    type: searchConstants.UPDATE_DIRECTION_STEPS,
    payload: directionStep,
  });
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

export const updateUserLocation = (currentLocation, startLocation) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      currentLocation: currentLocation,
      startLocation: startLocation,
    });
    console.log(body);
    const res = await axios.post("/start-location", body, config);

    dispatch({
      type: searchConstants.UPDATE_USER_LOCATION,
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

export const setTravelMode = (travelMode) => (dispatch) => {
  dispatch({
    type: searchConstants.SET_TRAVEL_MODE,
    payload: travelMode,
  });
};

export const setRenderRoute = () => (dispatch) => {
  dispatch({
    type: searchConstants.SET_RENDER_ROUTE,
  });
};

export const setRenderLocation = () => (dispatch) => {
  dispatch({
    type: searchConstants.SET_RENDER_LOCATION,
  });
};
