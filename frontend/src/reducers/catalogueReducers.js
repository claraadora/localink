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
    case catalogueConstants.ADD_REVIEW_ERROR:
      return {
        ...state,
        error: payload,
        currShop: null,
        loading: false,
      };
    case catalogueConstants.ADD_REVIEW:
      let temp = state.currShop.data.reviews;
      temp.push(payload);

      console.log(temp);
      return {
        ...state,
        loading: false,
        currShop: {
          ...state.currShop,
          data: { ...state.currShop.data, reviews: temp },
        },
      };
    default:
      return state;
  }
}
