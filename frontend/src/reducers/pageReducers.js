import pageConstants from "../constants/pageConstants";

const initialStates = {
  isShopper: null,
};

export default function page(state = initialStates, action) {
  const { type, payload } = action;
  switch (type) {
    case pageConstants.UPDATE_IS_SHOPPER:
      return { ...state, isShopper: payload };
    default:
      return state;
  }
}
