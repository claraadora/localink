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
  const body = JSON.stringify({ description, image, rating, shopId });
  try {
    const res = await axios.post("/review", body, config);

    dispatch({
      type: "ADD_REVIEW",
      payload: res.data,
    });

    dispatch(setAlert("Add review successful.", "success"));
  } catch (err) {
    dispatch({
      type: "CATALOGUE_ERROR",
    });
  }
};
