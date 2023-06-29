import { combineReducers } from "redux";
import albumReducer from "./albumReducer";
import songReducer from "./songReducer";

export default combineReducers({
  albums: albumReducer,
  songs: songReducer,
});
