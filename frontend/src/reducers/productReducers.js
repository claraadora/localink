import productConstants from "../constants/productConstants";

const initialState = {
  products: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case productConstants.GET_PRODUCT_LIST:
      return {
        ...state,
        products: payload,
        loading: false,
      };
    case productConstants.PRODUCT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
