import { combineReducers } from "redux";
import auth from "./authReducers";
import alert from "./alertReducers";
import profile from "./profileReducers";
import search from "./searchReducers";
import itinerary from "./itineraryReducers";

export default combineReducers({ auth, alert, profile, search, itinerary });
