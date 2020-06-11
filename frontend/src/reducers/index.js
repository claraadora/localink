import { combineReducers } from "redux";
import auth from "./authReducers";
import alert from "./alertReducers";
import profile from "./profileReducers";
import search from "./searchReducers";

export default combineReducers({ auth, alert, profile, search });
