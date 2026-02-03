// redux/rootReducer.ts
import { combineReducers } from "@reduxjs/toolkit";

import followReducer from "./other/followSlice"; 
import commentReducer from "./other/commentSlice";
import savedPostsReducer from "./other/savedPostsSlice";
import feedPostsReducer from "./other/feedPostsSlice";
import discoverCreatorsReducer from "@/redux/discover/discoverCreatorsSlice";

const rootReducer = combineReducers({
 
  follow: followReducer,
  comments: commentReducer, 
  savedPosts: savedPostsReducer, 
  feedPosts: feedPostsReducer,
   discoverCreators: discoverCreatorsReducer,
});

export default rootReducer;