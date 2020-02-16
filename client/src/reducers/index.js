import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import videoReducer from "./videoReducer";
import authReducer from "./authReducer";
import userReducer from "./userReducer";

export default combineReducers({
  video: videoReducer,
  errors: errorReducer,
  auth: authReducer,
  user: userReducer
});
