// redux/rootReducer.ts
import { combineReducers } from "@reduxjs/toolkit";

import followReducer from "./other/followSlice"; 
import commentReducer from "./other/commentSlice";
import savedPostsReducer from "./other/savedPostsSlice";
import feedPostsReducer from "./other/feedPostsSlice";
import purchasedMediaReducer from "./purchasedMedia/Slice";

const rootReducer = combineReducers({
 
  follow: followReducer,
  comments: commentReducer, 
  savedPosts: savedPostsReducer, 
  feedPosts: feedPostsReducer,
   purchasedMedia: purchasedMediaReducer,
});

export default rootReducer;