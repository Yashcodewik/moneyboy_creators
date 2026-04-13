import { API_LIKE_POST, API_UNLIKE_POST } from "@/utils/api/APIConstant";
import { apiPost } from "@/utils/endpoints/common";
import type { AppDispatch, RootState } from "@/redux/store";
import { updateFeedPost } from "@/redux/other/feedPostsSlice";
import { removeLikedPost, updateLikedPost } from "@/redux/likedPosts/Slice";

export const togglePostLike =
  (postId: string) =>
  async (dispatch: AppDispatch, getState: () => RootState): Promise<boolean> => {
    const state = getState();
    const feedPost = state.feedPosts.posts[postId];
    const likedPost = state.likedPosts.items.find((post: any) => post._id === postId);
    const targetPost = feedPost || likedPost;

    if (!targetPost) {
      return false;
    }

    const wasLiked = Boolean(targetPost.isLiked);
    const previousLikeCount = targetPost.likeCount ?? targetPost.likes ?? 0;
    const nextLikeCount = wasLiked
      ? Math.max(previousLikeCount - 1, 0)
      : previousLikeCount + 1;

    if (feedPost) {
      dispatch(
        updateFeedPost({
          postId,
          data: {
            isLiked: !wasLiked,
            likeCount: nextLikeCount,
          },
        }),
      );
    }

    if (likedPost) {
      dispatch(
        updateLikedPost({
          postId,
          data: {
            isLiked: !wasLiked,
            likeCount: nextLikeCount,
          },
        }),
      );
    }

    try {
      const res = await apiPost({
        url: wasLiked ? API_UNLIKE_POST : API_LIKE_POST,
        values: { postId },
      });

      if (!res?.success) {
        throw new Error("Failed to update like status");
      }

      if (wasLiked && likedPost) {
        dispatch(removeLikedPost(postId));
      }

      return true;
    } catch {
      if (feedPost) {
        dispatch(
          updateFeedPost({
            postId,
            data: {
              isLiked: wasLiked,
              likeCount: previousLikeCount,
            },
          }),
        );
      }

      if (likedPost) {
        dispatch(
          updateLikedPost({
            postId,
            data: {
              isLiked: wasLiked,
              likeCount: previousLikeCount,
            },
          }),
        );
      }

      return false;
    }
  };
