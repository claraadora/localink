import catalogueConstants from "../../constants/catalogueConstants";
import axios from "axios";
import { setAlert } from "../../actions/alertActions";

export const fetchShop = (shopId) => async (dispatch) => {
  try {
    const res = await axios.get(`/business/profile/${shopId}`);

    dispatch({
      type: catalogueConstants.FETCH_SHOP,
      payload: res,
    });

    dispatch(setAlert("Fetch shop successful.", "success"));
  } catch (err) {
    dispatch({
      type: catalogueConstants.FETCH_SHOP_ERROR,
    });
  }
};

export const addReview = (description, image, rating, shopId) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ description, image, rating });

  try {
    const res = await axios.post(`/review/${shopId}`, body, config);
    dispatch({
      type: "ADD_REVIEW",
      payload: { description, image, rating },
    });
    dispatch(setAlert("Add review successful.", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
    }
    console.log(errors);

    dispatch({
      type: "CATALOGUE_ERROR",
    });
  }
};
