import alertConstants from "../constants/alertConstants";
import { v4 as uuidv4 } from "uuid";

export const setAlert = (message, alertType) => (dispatch) => {
  const id = uuidv4();
  dispatch({
    type: alertConstants.SET_ALERT,
    payload: {
      message,
      alertType,
      id,
    },
  });
  console.log("alert type = " + alertType);
  setTimeout(
    () =>
      dispatch({
        type: alertConstants.CLEAR_ALERT,
        payload: id,
      }),
    5000
  );
};
