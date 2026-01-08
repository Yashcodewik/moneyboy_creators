// redux/rootReducer.ts
import { combineReducers } from "@reduxjs/toolkit";

import followReducer from "./other/followSlice"; // ADD THIS LINE

const rootReducer = combineReducers({
 
  follow: followReducer, // ADD THIS LINE
});

export default rootReducer;