import axios from "axios";
import chatConstants from "../constants/chatConstants";
import { setAlert } from "./alertActions";

export const getChat = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/inbox/${id}`);
    console.log("id " + id);

    dispatch({
      type: chatConstants.GET_CHATS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
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

export const afterPostMessage = (data) => (dispatch) => {
  dispatch({
    type: chatConstants.AFTER_POST_MESSAGE,
    payload: data,
  });
};
