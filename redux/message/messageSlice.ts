import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteThread, fetchMessages, fetchSidebar, fetchThreadDetails, hideThread, muteThread, searchMessages, sendMessageAction, toggleBlockThread } from "./messageActions";


interface MessageState {
  chatList: any[];
  messages: any[];
  activeThreadId: string | null;
  activeUser: any | null;
  searchedMessages: any[];
  loading: boolean;
  error: string | null;
  activeThreadDetails: any | null;
  isBlocked: boolean;
  hiddenChatList: any[];
  isHidden: boolean;
}

const initialState: MessageState = {
  chatList: [],
  messages: [],
  activeThreadId: null,
  activeUser: null,
  searchedMessages: [],
  loading: false,
  error: null,
  activeThreadDetails: null,
  isBlocked: false,
  hiddenChatList: [],
  isHidden: false,
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
      if (action.payload.threadId !== state.activeThreadId) return;
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
    const receiverId =
      typeof msg.receiverId === "object"
        ? msg.receiverId._id
        : msg.receiverId;

    // Mark read if this person (readerId) was the receiver
    if (receiverId === readerId) {
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

setThreadDetails: (state, action) => {
  state.activeThreadDetails = action.payload;

  const perms = action.payload?.permissions;

  state.isBlocked =
    perms?.isBlockedByYou || perms?.isBlockedByOther || false;
    state.isHidden = perms?.isHidden || false;
},

    clearMessages: (state) => {
      state.messages = [];
    },
  },

  extraReducers: (builder) => {
    builder

      // Sidebar
      .addCase(fetchSidebar.fulfilled, (state, action) => {
       state.chatList = action.payload.visible;
      state.hiddenChatList = action.payload.hidden;
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
      const { threadPublicId, isHidden } = action.payload;

      if (isHidden) {
        // Move from visible → hidden
        const thread = state.chatList.find(
          (chat) => chat.publicId === threadPublicId
        );

        if (thread) {
          state.hiddenChatList.unshift(thread);
          state.chatList = state.chatList.filter(
            (chat) => chat.publicId !== threadPublicId
          );
        }
      } else {
        // Move from hidden → visible
        const thread = state.hiddenChatList.find(
          (chat) => chat.publicId === threadPublicId
        );

        if (thread) {
          state.chatList.unshift(thread);
          state.hiddenChatList = state.hiddenChatList.filter(
            (chat) => chat.publicId !== threadPublicId
          );
        }
      }
        if (state.activeThreadId === threadPublicId) {
        state.isHidden = isHidden;
      }
    })

.addCase(fetchThreadDetails.fulfilled, (state, action) => {
  state.activeThreadDetails = action.payload;

  const perms = action.payload?.permissions;

  state.isBlocked =
    perms?.isBlockedByYou || perms?.isBlockedByOther || false;
})
      // Delete
      .addCase(deleteThread.fulfilled, (state, action) => {
        state.chatList = state.chatList.filter(
          (chat) => chat.publicId !== action.meta.arg
        );
        state.messages = [];
      })
     .addCase(toggleBlockThread.fulfilled, (state, action) => {
      const { threadPublicId, isBlocked } = action.payload;

      // Update sidebar
      const thread = state.chatList.find(
        (t) => t.publicId === threadPublicId
      );

      if (thread) {
        thread.isBlocked = isBlocked;
      }

      // ✅ Update active thread state
      if (state.activeThreadId === threadPublicId) {
        state.isBlocked = isBlocked;

        if (state.activeThreadDetails?.permissions) {
          state.activeThreadDetails.permissions.isBlockedByYou = isBlocked;
        }
      }
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
  updateUserOnlineStatus,
  setThreadDetails
} = messageSlice.actions;

export default messageSlice.reducer;
