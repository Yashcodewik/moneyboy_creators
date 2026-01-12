
import { Middleware } from "@reduxjs/toolkit";
import { updateFollowerCount, updateFollowingCount } from "./followSlice";
import { RootState } from "../store";

export const followMiddleware: Middleware<{}, RootState> =
  (storeAPI) => (next) => (action) => {
    const result = next(action);


    if (
      typeof action === "object" &&
      action !== null &&
      "type" in action &&
      "payload" in action
    ) {
      const typedAction = action as {
        type: string;
        payload?: any;
      };

      if (typedAction.type === "follow/followUser/fulfilled") {
        const response = typedAction.payload;

        if (response?.success) {
          storeAPI.dispatch(updateFollowingCount(1));

          if (
            response.data?.isFollowingYou ||
            response.data?.wasFollowingYou
          ) {
            storeAPI.dispatch(updateFollowerCount(1));
          }
        }
      }

      if (typedAction.type === "follow/unfollowUser/fulfilled") {
        const response = typedAction.payload;

        if (response?.success) {
          storeAPI.dispatch(updateFollowingCount(-1));

          if (response.data?.wasFollowingYou) {
            storeAPI.dispatch(updateFollowerCount(-1));
          }
        }
      }
    }

    return result;
  };
