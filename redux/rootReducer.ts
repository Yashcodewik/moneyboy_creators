// redux/rootReducer.ts
import { combineReducers } from "@reduxjs/toolkit";

import followReducer from "./other/followSlice"; 
import commentReducer from "./other/commentSlice";
import savedPostsReducer from "./other/savedPostsSlice";
import feedPostsReducer from "./other/feedPostsSlice";
import discoverCreatorsReducer from "@/redux/discover/discoverCreatorsSlice";
import purchasedMediaReducer from "./purchasedMedia/Slice";
import savedFreeCreatorsReducer from "@/redux/wishlist/savedFreeCreatorsSlice";
import feedReducer from "./feed/feedSlice";
import likedPostsReducer from "./likedPosts/Slice";
import savedLockedPostsReducer from "@/redux/wishlist/savedLockedPostsSlice";
import creatorsReducer from "@/redux/store/Slice";


const rootReducer = combineReducers({
 
  follow: followReducer,
  comments: commentReducer, 
  savedPosts: savedPostsReducer, 
  feedPosts: feedPostsReducer,
   discoverCreators: discoverCreatorsReducer,
   purchasedMedia: purchasedMediaReducer,
   savedFreeCreators: savedFreeCreatorsReducer, 
   feed: feedReducer,
   likedPosts: likedPostsReducer, 
   savedLockedPosts: savedLockedPostsReducer,
   creators: creatorsReducer,

});

export default rootReducer;