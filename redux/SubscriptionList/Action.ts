import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { apiPost, getApi } from "@/utils/endpoints/common";
import {
    API_CANCEL_SUBSCRIPTION,
  API_MY_SUBSCRIBERS,
  API_MY_SUBSCRIPTIONS,
} from "@/utils/api/APIConstant";
import {
  setLoading,
  setSubscriptions,
  setSubscribers,
  setError,
  cancelSubscriptionSuccess,
} from "./Slice";

/**
 * Get My Subscriptions
 */
export const useMySubscriptions = (
  params: {
    page: number;
    rowsPerPage: number;
    searchText: string;
  },
  enabled: boolean
) => {
  const dispatch = useDispatch();

  return useQuery({
    queryKey: ["my-subscriptions", params],
    enabled,
    queryFn: async () => {
      try {
        dispatch(setLoading(true));

        const res = await getApi({
          url: API_MY_SUBSCRIPTIONS,
          page: params.page,
          rowsPerPage: params.rowsPerPage,
          searchText: params.searchText,
        });

        if (res?.success) {
          dispatch(setSubscriptions(res?.data || []));
        } else {
          dispatch(setError("Failed to fetch subscriptions"));
        }

        return res;
      } catch (error: any) {
        dispatch(setError(error?.message || "Something went wrong"));
      } finally {
        dispatch(setLoading(false));
      }
    },
  });
};

/**
 * Get My Subscribers
 */
export const useMySubscribers = (
  params: {
    page: number;
    rowsPerPage: number;
    searchText: string;
  },
  enabled: boolean
) => {
  const dispatch = useDispatch();

  return useQuery({
    queryKey: ["my-subscribers", params],
    enabled,
    queryFn: async () => {
      try {
        dispatch(setLoading(true));

        const res = await getApi({
          url: API_MY_SUBSCRIBERS,
          page: params.page,
          rowsPerPage: params.rowsPerPage,
          searchText: params.searchText,
        });

        if (res?.success) {
          dispatch(setSubscribers(res?.data || []));
        } else {
          dispatch(setError("Failed to fetch subscribers"));
        }

        return res;
      } catch (error: any) {
        dispatch(setError(error?.message || "Something went wrong"));
      } finally {
        dispatch(setLoading(false));
      }
    },
  });
};

export const useCancelSubscription = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (subscriptionId: string) => {
      return await apiPost({
        url: API_CANCEL_SUBSCRIPTION+`/${subscriptionId}`,
        values: {}, 
      });
    },

    onSuccess: (res, subscriptionId) => {
      if (res?.success) {
        // ✅ update redux state
        dispatch(cancelSubscriptionSuccess(subscriptionId));

        // optional refetch
        queryClient.invalidateQueries({
          queryKey: ["my-subscriptions"],
        });
      }
    },
  });
};
