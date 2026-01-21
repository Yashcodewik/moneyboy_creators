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

// IMPORTANT: Update your follow/unfollow actions to include profileUserId
export const followUserAction = createAsyncThunk(
  "follow/followUser",
  async (profileUserId: string, { dispatch }) => {
    try {
      const response = await apiPost({
        url: API_FOLLOW_USER,
        values: { userId: profileUserId }, // Send the profile user ID
      });

      // If your API returns updated counts, update Redux state
      if (response?.followerCount !== undefined) {
        // You might want to create a separate action for updating specific user's counts
        // Or refetch counts after follow
        dispatch(fetchFollowerCounts()); // This fetches counts for logged-in user
      }

      return {
        ...response,
        profileUserId, // Include profileUserId in response
        followerCount: response?.followerCount // Include updated count if available
      };
    } catch (error) {
      console.error("Error following user:", error);
      throw error;
    }
  }
);

export const unfollowUserAction = createAsyncThunk(
  "follow/unfollowUser",
  async (profileUserId: string, { dispatch }) => {
    try {
      const response = await apiPost({
        url: API_UNFOLLOW_USER,
        values: { userId: profileUserId }, // Send the profile user ID
      });

      // If your API returns updated counts, update Redux state
      if (response?.followerCount !== undefined) {
        dispatch(fetchFollowerCounts()); // This fetches counts for logged-in user
      }

      return {
        ...response,
        profileUserId, // Include profileUserId in response
        followerCount: response?.followerCount // Include updated count if available
      };
    } catch (error) {
      console.error("Error unfollowing user:", error);
      throw error;
    }
  }
);

export const fetchUserFollowerCounts = createAsyncThunk(
  "follow/fetchUserCounts",
  async (userId: string, { dispatch }) => {
    try {
      dispatch(setFollowLoading(true));
      const response = await getApiWithOutQuery({
        url: `${API_FOLLOWER_COUNT}/${userId}`,
      });

      if (response?.success && response.data) {
        return response.data;
      }
      return { followerCount: 0, followingCount: 0 };
    } catch (error) {
      console.error("Error fetching user follower counts:", error);
      return { followerCount: 0, followingCount: 0 };
    } finally {
      dispatch(setFollowLoading(false));
    }
  }
);