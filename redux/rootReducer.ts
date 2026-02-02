// redux/rootReducer.ts
import { combineReducers } from "@reduxjs/toolkit";

import followReducer from "./other/followSlice"; 
import commentReducer from "./other/commentSlice";
import savedPostsReducer from "./other/savedPostsSlice";

const rootReducer = combineReducers({
 
  follow: followReducer,
  comments: commentReducer, 
  savedPosts: savedPostsReducer, 
});

export default rootReducer;