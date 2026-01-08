
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setFollowCounts, setFollowLoading } from "./followSlice";
import { apiPost, getApiWithOutQuery } from "@/utils/endpoints/common";
import { API_FOLLOWER_COUNT, API_FOLLOW_USER, API_UNFOLLOW_USER } from "@/utils/api/APIConstant";


export const fetchFollowerCounts = createAsyncThunk(
  "follow/fetchCounts",
  async (_, { dispatch }) => {
    try {
      dispatch(setFollowLoading(true));
      const response = await getApiWithOutQuery({
        url: API_FOLLOWER_COUNT,
      });

      if (response?.success && response.data) {
        dispatch(setFollowCounts({
          followerCount: response.data.followerCount || 0,
          followingCount: response.data.followingCount || 0,
        }));
      }
      return response?.data || { followerCount: 0, followingCount: 0 };
    } catch (error) {
      console.error("Error fetching follower counts:", error);
      return { followerCount: 0, followingCount: 0 };
    } finally {
      dispatch(setFollowLoading(false));
    }
  }
);


export const followUserAction = createAsyncThunk(
  "follow/followUser",
  async (userId: string, { dispatch }) => {
    try {
      const response = await apiPost({
        url: API_FOLLOW_USER,
        values: { userId },
      });

      return response;
    } catch (error) {
      console.error("Error following user:", error);
      throw error;
    }
  }
);


export const unfollowUserAction = createAsyncThunk(
  "follow/unfollowUser",
  async (userId: string, { dispatch }) => {
    try {
      const response = await apiPost({
        url: API_UNFOLLOW_USER,
        values: { userId },
      });

      return response;
    } catch (error) {
      console.error("Error unfollowing user:", error);
      throw error;
    }
  }
);