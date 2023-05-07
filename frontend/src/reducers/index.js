import { combineReducers } from "redux";
import { userReducer } from "./users/reducer";

const rootReducers = combineReducers({
  users: userReducer,
});

export default rootReducers;
