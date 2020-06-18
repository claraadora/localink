import searchConstants from "../constants/searchConstants";

const initialState = {
  productArray: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  console.log("payload" + payload);

  switch (type) {
    case searchConstants.SEARCH_REQUEST:
    case searchConstants.REORDER_SEARCH:
      return {
        error: {},
        loading: false,
        productArray: payload,
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
