import axios from "axios";
import chatConstants from "../constants/chatConstants";
import { setAlert } from "./alertActions";

export const getChatList = (id, isShopper) => async (dispatch) => {
  try {
    const res = await axios.get(`/inbox/${id}`);

    if (res.length > 0) {
      dispatch(setCurrActive(res[0][isShopper ? "shop" : "shopper"]));
    }
    dispatch({
      type: chatConstants.GET_CHAT,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
    }
    dispatch({
      type: chatConstants.CHAT_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

export const addChatItem = (shopId, shopperId, isShopper) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ shopId, shopperId, isShopper });

  try {
    const res = await axios.post("/new-chat", body, config);
    dispatch({
      type: chatConstants.ADD_CHAT_ITEM,
    });
    dispatch(setCurrActive(isShopper ? shopId : shopperId));
    dispatch(getChatList(isShopper ? shopId : shopperId));

    console.log(body);
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
    }
    console.log(errors);

    dispatch({
      type: chatConstants.CHAT_ERROR,
    });
  }
};

export const afterPostMessage = (data) => (dispatch) => {
  dispatch({
    type: chatConstants.AFTER_POST_MESSAGE,
    payload: data,
  });
};

export const setCurrActive = (id) => (dispatch) => {
  dispatch({
    type: chatConstants.SET_CURR_ACTIVE_CHAT,
    payload: id,
  });
};
