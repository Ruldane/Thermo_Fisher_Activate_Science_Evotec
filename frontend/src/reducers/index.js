import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import supplierReducer from "./supplierReducer";
import roleReducer from "./roleReducer";

const rootReducer = combineReducers({
  user: userReducer,
  supplier: supplierReducer,
  role: roleReducer
});

export default rootReducer;
