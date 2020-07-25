import searchConstants from "../constants/searchConstants";

const initialState = {
  productArray: [],
  loading: true,
  sortedBy: "distance",
  directionSteps: [],
  error: {},
  userLocation: null,
  travelMode: "DRIVING",
  renderLocation: false,
  renderRoute: false,
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
      };
    case searchConstants.LOAD_DIRECTION_STEPS:
    case searchConstants.UPDATE_DIRECTION_STEPS:
      return {
        ...state,
        error: {},
        loading: false,
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
    case searchConstants.SET_RENDER_LOCATION:
      return {
        ...state,
        renderLocation: true,
        renderRoute: false,
        loading: true,
      };
    case searchConstants.SET_RENDER_ROUTE:
      return {
        ...state,
        renderLocation: false,
        renderRoute: true,
        loading: true,
      };
    default:
      return state;
  }
}
