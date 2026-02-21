// store/message/messageActions.ts

import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getApi,
  apiPost,
  apiPostWithMultiForm,
  getApiByParams,
} from "@/utils/endpoints/common";
import {
  API_MESSAGE_SIDEBAR,
  API_MESSAGE_CHAT,
  API_MESSAGE_CHAT_UPLOAD_MEDIA,
} from "@/utils/api/APIConstant";

// Sidebar
export const fetchSidebar = createAsyncThunk(
  "message/fetchSidebar",
  async () => {
    const res = await getApi({
      url: API_MESSAGE_SIDEBAR,
      page: 1,
      rowsPerPage: 50,
      searchText: "",
    });

    return res;
  }
);

// Fetch Messages
export const fetchMessages = createAsyncThunk(
  "message/fetchMessages",
  async (threadId: string) => {
    const res = await getApi({
      url: API_MESSAGE_CHAT,
      page: 1,
      rowsPerPage: 50,
      searchText: threadId,
    });

    return res?.data || [];
  }
);

// Send Message
export const sendMessageAction = createAsyncThunk(
  "message/sendMessage",
  async ({
    threadId,
    senderId,
    receiverId,
    text,
  }: {
    threadId: string;
    senderId: string;
    receiverId: string;
    text: string;
  }) => {
    const res = await apiPost({
      url: "/messages/send",
      values: { threadId, senderId, receiverId, text },
    });

    return res;
  }
);

// Mute
export const muteThread = createAsyncThunk(
  "message/muteThread",
  async (threadId: string) => {
    await apiPost({
      url: `/messages/thread/mute/${threadId}`,
      values: {},
    });

    return threadId;
  }
);

// Hide
export const hideThread = createAsyncThunk(
  "message/hideThread",
  async (threadPublicId: string, { rejectWithValue }) => {
    try {
      const res = await apiPost({
        url: `/messages/thread/hide/${threadPublicId}`,
        values: {},
      });

      return {
        threadPublicId,
        ...res, // includes isHidden
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Hide failed"
      );
    }
  }
);
// Delete
export const deleteThread = createAsyncThunk(
  "message/deleteThread",
  async (threadId: string) => {
    await apiPost({
      url: `/messages/thread/${threadId}`,
      values: {},
    });

    return threadId;
  }
);

// Search
export const searchMessages = createAsyncThunk(
  "message/searchMessages",
  async ({
    threadId,
    searchText,
  }: {
    threadId: string;
    searchText: string;
  }) => {
    const res = await getApi({
      url: `/messages/thread/search/${threadId}`,
      page: 1,
      rowsPerPage: 50,
      searchText,
    });

    return res?.data || [];
  }
);

export const toggleBlockThread = createAsyncThunk(
  "message/toggleBlockThread",
  async (threadPublicId: string, { rejectWithValue }) => {
    try {
      const res = await apiPost({
        url: `/messages/thread/toggle-block/${threadPublicId}`,
        values: {},
      });

      return {
        threadPublicId,
        ...res,
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Block failed");
    }
  }
);

export const reportThread = createAsyncThunk(
  "message/reportThread",
  async (
    {
      threadPublicId,
      message,
    }: { threadPublicId: string; message: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await apiPost({
        url: `/messages/thread/report/${threadPublicId}`,
        values: { message },
      });

      return res;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Report failed");
    }
  }
);

export const fetchThreadDetails = createAsyncThunk(
  "message/fetchThreadDetails",
  async (threadPublicId: string, { rejectWithValue }) => {
    try {
      const res = await getApiByParams({
        url: "/messages/thread",
        params: threadPublicId,
      });

      return res;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch thread details"
      );
    }
  }
);
