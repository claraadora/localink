import pageConstants from "../constants/pageConstants";

export const updateIsShopper = (isShopper) => (dispatch) => {
  dispatch({
    type: pageConstants.UPDATE_IS_SHOPPER,
    payload: isShopper,
  });
};
