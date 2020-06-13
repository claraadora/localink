import { itineraryConstants } from "../../constants/itineraryConstants";
import { setAlert } from "../alertActions";

export const addToItinerary = (data) => (dispatch) => {
  dispatch({
    type: itineraryConstants.UPDATE_ITINERARY,
    payload: {
      data,
    },
  });
  dispatch(setAlert("Added to Itinerary", "success"));
};
