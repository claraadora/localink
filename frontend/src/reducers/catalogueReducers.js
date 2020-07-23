import catalogueConstants from "../constants/catalogueConstants";

const initialState = {
  currShop: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case catalogueConstants.FETCH_SHOP:
      return {
        ...state,
        currShop: payload,
        loading: false,
      };
    case catalogueConstants.FETCH_SHOP_ERROR:
      return {
        ...state,
        error: payload,
        currShop: null,
        loading: false,
      };
    default:
      return state;
  }
}
