import { itineraryConstants } from "../../constants/itineraryConstants";

export const addToItinerary = (item) => (dispatch) => {
  dispatch({
    type: itineraryConstants.ADD_TO_ITINERARY,
    payload: item,
  });
  //   dispatch(setAlert("Added to Itinerary", "success"));
};

export const reorderItinerary = (item) => (dispatch) => {
  dispatch({
    type: itineraryConstants.REORDER_ITINERARY,
    payload: item,
  });
  // dispatch(setAlert("Added to Itinerary", "success"));
};
