// redux/rootReducer.ts
import { combineReducers } from "@reduxjs/toolkit";

import followReducer from "./other/followSlice"; 
import commentReducer from "./other/commentSlice";
const rootReducer = combineReducers({
 
  follow: followReducer,
  comments: commentReducer, 
});

export default rootReducer;