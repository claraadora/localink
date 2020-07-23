import catalogueConstants from "../../constants/catalogueConstants";
import axios from "axios";

export const fetchShop = (shopId) => async (dispatch) => {
  try {
    const res = await axios.get(`/business/profile/${shopId}`);

    dispatch({
      type: catalogueConstants.FETCH_SHOP,
      payload: res,
    });
  } catch (err) {
    dispatch({
      type: catalogueConstants.FETCH_SHOP_ERROR,
    });
  }
};
