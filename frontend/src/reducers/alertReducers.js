import alertConstants from "../constants/alertConstants";

const initialStates = [];

/* Example initial state
  {
    id: 1, 
    msg: "Please log in", 
    alertTypes: 'success'
  }

  action = type + payload (data/state)
*/

export default function alert(state = initialStates, action) {
  const { type, payload } = action;
  switch (type) {
    case alertConstants.SET_ALERT:
      return [...state, payload];
    case alertConstants.CLEAR_ALERT:
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
}
