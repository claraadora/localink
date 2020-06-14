import { itineraryConstants } from "../constants/itineraryConstants";

const initialStates = {
  loading: true,
  itineraryArray: [],
};

export default function itinerary(state = initialStates, action) {
  const { type, payload } = action;
  switch (type) {
    case itineraryConstants.ADD_TO_ITINERARY:
      return {
        loading: false,
        itineraryArray: [...state.itineraryArray, payload],
      };
    case itineraryConstants.REORDER_ITINERARY:
      return {
        loading: false,
        itineraryArray: payload,
      };
    default:
      return state;
  }
}
