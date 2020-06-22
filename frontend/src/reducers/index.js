import { combineReducers } from "redux";
import auth from "./authReducers";
import alert from "./alertReducers";
import profile from "./profileReducers";
import search from "./searchReducers";
import itinerary from "./itineraryReducers";
import chat from "./chatReducers";

export default combineReducers({
  auth,
  alert,
  profile,
  search,
  itinerary,
  chat,
});
