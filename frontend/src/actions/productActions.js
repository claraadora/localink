import axios from "axios";
import { setAlert } from "./alertActions";
import productConstants from "../constants/profileConstants";

export const getProductList = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");

    dispatch({
      type: productConstants.GET_PRODUCT_LIST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: productConstants.PRODUCT_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// create or add product
export const addProduct = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("api/product", formData, config);

    dispatch({
      type: productConstants.ADD_PRODUCT,
      payload: res.data,
    });

    dispatch(setAlert("Product Added"), "success");
    history.push("/business/product/manage");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: productConstants.PRODUCT_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
