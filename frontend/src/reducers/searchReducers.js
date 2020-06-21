import searchConstants from "../constants/searchConstants";

const initialState = {
  productArray: [],
  loading: true,
  sortedBy: "distance",
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case searchConstants.SEARCH_REQUEST:
      return {
        error: {},
        loading: false,
        productArray: payload,
      };
    case searchConstants.REORDER_SEARCH:
      return {
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
        error: {},
        productArray: [],
        loading: false,
      };
    default:
      return state;
  }
}
