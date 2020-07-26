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

export const reorderSearch = (sortBy, order, items, id) => (dispatch) => {
  const sortedSearch = items.sort(dynamicSort(sortBy, order, id));
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

export const updateUserLocation = (
  currentLocation,
  startLocation,
  shopperId
) => async (dispatch) => {
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
    const res = await axios.post(`/start-location/${shopperId}`, body, config);

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

export const updateStops = (stops) => (dispatch) => {
  dispatch({
    type: searchConstants.UPDATE_STOPS,
    payload: stops,
  });
};

export const createNavLink = (stops, travelMode) => (dispatch) => {
  const URI = `https://www.google.com/maps/dir/?api=1&dir_action=navigate&travelMode=${travelMode}&`;

  const len = stops.length;
  const startLocation = `origin=${stops[0].lat},${stops[0].lng}&`;
  const endLocation = `destination=${stops[len - 1].lat},${stops[len - 1].lng}`;
  let waypoints = len <= 2 ? "" : "&waypoints=";

  if (len > 2) {
    for (let i = 1; i < len - 1; i++) {
      waypoints = waypoints.concat(`${stops[i].lat},${stops[i].lng}`);
      console.log(`${stops[i].lat},${stops[i].lng}`);
      console.log(waypoints);

      if (i !== len - 2) {
        waypoints = waypoints.concat("|");
      }
    }
  }
  const finalURI = URI + startLocation + endLocation + waypoints;

  dispatch({
    type: searchConstants.UPDATE_NAV_LINK,
    payload: finalURI,
  });
};
