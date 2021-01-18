import { createStore, combineReducers } from "redux";
import dataReducers from "./reducers/dataReducers";
import userReducer from "./reducers/userReducer";

const reducer = combineReducers({
  users: userReducer,
  data: dataReducers,
});

export const store = createStore(reducer);
