import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteThread, fetchMessages, fetchSidebar, hideThread, muteThread, searchMessages, sendMessageAction } from "./messageActions";


interface MessageState {
  chatList: any[];
  messages: any[];
  activeThreadId: string | null;
  activeUser: any | null;
  searchedMessages: any[];
  loading: boolean;
  error: string | null;
}

const initialState: MessageState = {
  chatList: [],
  messages: [],
  activeThreadId: null,
  activeUser: null,
  searchedMessages: [],
  loading: false,
  error: null,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setActiveThread: (state, action: PayloadAction<string>) => {
      state.activeThreadId = action.payload;
    },

    setActiveUser: (state, action: PayloadAction<any>) => {
      state.activeUser = action.payload;
    },

    addSocketMessage: (state, action: PayloadAction<any>) => {
      const exists = state.messages.some(
        (msg) => msg._id === action.payload._id
      );
      if (!exists) {
        state.messages.push(action.payload);
      }
    },

    markMessagesRead: (state) => {
      state.messages = state.messages.map((msg) => ({
        ...msg,
        isRead: true,
      }));
    },

markMessagesReadFromSocket: (state, action) => {
  const readerId = action.payload;

  state.messages = state.messages.map((msg: any) => {
    const senderId =
      typeof msg.senderId === "object"
        ? msg.senderId._id
        : msg.senderId;

    if (senderId === readerId) {
      return { ...msg, isRead: true };
    }

    return msg;
  });
},
updateUserOnlineStatus: (
  state,
  action: { payload: { userId: string; isOnline: boolean } }
) => {
  const { userId, isOnline } = action.payload;

  state.chatList = state.chatList.map((chat: any) =>
    chat?.user?.id === userId
      ? {
          ...chat,
          user: {
            ...chat.user,
            isOnline,
          },
        }
      : chat
  );
},



    clearMessages: (state) => {
      state.messages = [];
    },
  },

  extraReducers: (builder) => {
    builder

      // Sidebar
      .addCase(fetchSidebar.fulfilled, (state, action) => {
        state.chatList = action.payload;
      })

      // Messages
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
      })

      // Send
      .addCase(sendMessageAction.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      })

      // Search
      .addCase(searchMessages.fulfilled, (state, action) => {
        state.searchedMessages = action.payload;
      })
      .addCase(muteThread.fulfilled, (state, action) => {
        state.chatList = state.chatList.map((chat) =>
          chat.publicId === action.payload
            ? { ...chat, isMuted: true }
            : chat
        );
      })

      .addCase(hideThread.fulfilled, (state, action) => {
        state.chatList = state.chatList.filter(
          (chat) => chat.publicId !== action.payload
        );
      })


      // Delete
      .addCase(deleteThread.fulfilled, (state, action) => {
        state.chatList = state.chatList.filter(
          (chat) => chat.publicId !== action.meta.arg
        );
        state.messages = [];
      });
  },
});

export const {
  setActiveThread,
  setActiveUser,
  addSocketMessage,
  markMessagesRead,
  markMessagesReadFromSocket,
  clearMessages,
  updateUserOnlineStatus
} = messageSlice.actions;

export default messageSlice.reducer;
