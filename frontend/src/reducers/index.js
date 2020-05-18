import { combineReducers } from "redux";
import authReducers from "./authReducers";
import alertReducers from "./alertReducers";

export default combineReducers({ authReducers, alertReducers });
