import searchConstants from "../constants/searchConstants";

const initialState = {
  productArray: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case searchConstants.SEARCH_REQUEST:
      return {
        ...state,
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
    default:
      return state;
  }
}
