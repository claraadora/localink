import searchConstants from "../constants/searchConstants";

const initialState = {
  productArray: [],
  loading: true,
  sortedBy: "distance",
  renderRoute: false,
  directionSteps: [],
  error: {},
  userLocation: null,
  travelMode: "DRIVING",
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case searchConstants.SEARCH_REQUEST:
      return {
        ...state,
        error: {},
        loading: false,
        productArray: payload,
      };
    case searchConstants.LOAD_ROUTE:
      return {
        ...state,
        error: {},
        loading: false,
        renderRoute: true,
      };
    case searchConstants.LOAD_DIRECTION_STEPS:
    case searchConstants.UPDATE_DIRECTION_STEPS:
      return {
        ...state,
        error: {},
        loading: false,
        renderRoute: true,
        directionSteps: payload,
      };
    case searchConstants.REORDER_SEARCH:
      return {
        ...state,
        error: {},
        loading: false,
        sortedBy: payload.sortedBy,
        productArray: payload.productArray,
      };
    case searchConstants.SEARCH_ERROR:
      return {
        ...state,
        loading: false,
        productArray: [],
        error: payload,
      };
    case searchConstants.CLEAR_SEARCH:
      return {
        ...state,
        error: {},
        productArray: [],
        loading: false,
      };
    case searchConstants.UPDATE_USER_LOCATION:
      return {
        ...state,
        userLocation: payload,
      };
    case searchConstants.SET_TRAVEL_MODE:
      return {
        ...state,
        travelMode: payload,
      };
    default:
      return state;
  }
}
