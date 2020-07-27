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
    case "CATALOGUE_ERROR":
      return {
        ...state,
        error: payload,
        currShop: null,
        loading: false,
      };
    case "ADD_REVIEW":
      let temp = state.currShop.reviews;
      temp.push(payload);

      return {
        ...state,
        loading: false,
        error: payload,
        currShop: {
          ...state.currShop,
          reviews: temp,
        },
      };
    default:
      return state;
  }
}
