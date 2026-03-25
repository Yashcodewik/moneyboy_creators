import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  clearConversation,
  deleteThread,
  fetchMessages,
  fetchMessageUnreadCount,
  fetchSidebar,
  fetchThreadDetails,
  hideThread,
  muteThread,
  searchMessages,
  sendMessageAction,
  toggleBlockThread,
} from "./messageActions";
import { RootState } from "../store";

interface MessageState {
  chatList: any[];
  messages: any[];
  activeThreadId: string | null;
  activeUser: any | null;
  searchedMessages: any[];
  loading: boolean;
  error: string | null;
  activeThreadDetails: any | null;
  isMute: boolean;
  isBlocked: boolean;
  isBlockedByYou: boolean;
  isBlockedByOther: boolean;
  hiddenChatList: any[];
  isHidden: boolean;
  // messageUnreadCount: number;
  currentUserId: string | null; // 👈 Add currentUserId to state
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
  isMute: false,
  isBlocked: false,
  isBlockedByYou: false,
  isBlockedByOther: false,
  hiddenChatList: [],
  isHidden: false,
  // messageUnreadCount: 0,
  currentUserId: null, // 👈 Initialize currentUserId
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
   setActiveThread: (state, action: PayloadAction<string | null>) => {
  if (state.activeThreadId === action.payload) return;
    state.activeThreadId = action.payload;
},

    setActiveUser: (state, action: PayloadAction<any>) => {
      state.activeUser = action.payload;
    },

addSocketMessage: (state, action: PayloadAction<any>) => {
  const msg = action.payload;
  const isActiveChat = msg.threadId === state.activeThreadId;

  // Replace optimistic message with real one from server
  // (real messages won't have a temp- prefix, but may match by content+time)
  if (isActiveChat) {
    const isTempMessage = msg._id?.startsWith("temp-");

    if (!isTempMessage) {
      // Remove any temp message with same text to avoid duplicates
      state.messages = state.messages.filter(
        (m) =>
          !(
            m._id?.startsWith("temp-") &&
            m.message === msg.message &&
            m.threadId === msg.threadId
          ),
      );
    }

    const exists = state.messages.some((m) => m._id === msg._id);
    if (!exists) {
      state.messages.push(msg);
    }
  }
  console.log("🧠 REDUX addSocketMessage:", msg.threadId);

  // ... rest of your existing sidebar unread count logic unchanged
  const receiverId =
    typeof msg.receiverId === "object" ? msg.receiverId._id : msg.receiverId;
  const isReceiver = receiverId === state.currentUserId;

  if (isReceiver) {
    if (isActiveChat) {
      state.chatList = state.chatList.map((chat) =>
        chat.publicId === msg.threadId
          ? { ...chat, unreadCount: 0 }
          : chat
      );
    } else {
      state.chatList = state.chatList.map((chat) =>
        chat.publicId === msg.threadId
          ? { ...chat, unreadCount: (chat.unreadCount || 0) + 1 }
          : chat
      );
  //       state.messageUnreadCount = state.chatList.reduce(
  //   (total, chat) => total + (chat.unreadCount || 0),
  //   0
  // );
    }
  }
},
    updatePPVStatus: (
      state,
      action: PayloadAction<{
        ppvId: string;
        status: string;
        deliveredMedia?: string[];
      }>,
    ) => {
      const { ppvId, status, deliveredMedia } = action.payload;
      state.messages = state.messages.map((msg) => {
        if (
          msg.ppvRequestId &&
          msg.ppvRequestId._id?.toString() === ppvId.toString()
        ) {
          return {
            ...msg,
            ppvRequestId: {
              ...msg.ppvRequestId,
              status,
              ...(deliveredMedia ? { deliveredMedia } : {}),
            },
          };
        }
        return msg;
      });
    },

    markMessagesRead: (state) => {
      state.messages = state.messages.map((msg) => ({
        ...msg,
        isRead: true,
      }));
    },

  resetThreadUnread: (state, action: PayloadAction<string>) => {
    const threadId = action.payload;

    const chat = state.chatList.find(
      (chat) => chat.publicId === threadId
    );

  if (chat?.unreadCount) {
    // state.messageUnreadCount = Math.max(
    //   0,
    //   state.messageUnreadCount - chat.unreadCount
    // );
  }

    state.chatList = state.chatList.map((chat) =>
      chat.publicId === threadId
        ? { ...chat, unreadCount: 0 }
        : chat
    );
  },

    markMessagesReadFromSocket: (state, action) => {
      const threadId = action.payload;

      state.messages = state.messages.map((msg: any) => {
        if (msg.threadId === threadId) {
          return { ...msg, isRead: true };
        }
        return msg;
      });
    },
    updateUserOnlineStatus: (
      state,
      action: { payload: { userId: string; isOnline: boolean } },
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
          : chat,
      );
    },

    setThreadDetails: (state, action) => {
      state.activeThreadDetails = action.payload;
      const perms = action.payload?.permissions;
      state.isBlockedByYou = perms?.isBlockedByYou || false;
      state.isBlockedByOther = perms?.isBlockedByOther || false;
      state.isBlocked =
        perms?.isBlockedByYou || perms?.isBlockedByOther || false;
      state.isHidden = perms?.isHidden || false;
      state.isMute = perms?.isMute || false;
    },

    clearMessages: (state) => {
      state.messages = [];
    },
    // setMessageUnreadCount: (state, action: PayloadAction<number>) => {
    //   state.messageUnreadCount = action.payload;
    // },

    // incrementUnread: (state) => {
    //   state.messageUnreadCount += 1;
    // },

    // resetUnread: (state) => {
    //   state.messageUnreadCount = 0;
    // },
    setCurrentUser: (state, action: PayloadAction<string>) => {
      state.currentUserId = action.payload;
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
  const { threadId, isMuted } = action.payload;

  // ✅ update sidebar
  state.chatList = state.chatList.map((chat) =>
    chat.publicId === threadId
      ? { ...chat, isMuted }
      : chat
  );

  state.hiddenChatList = state.hiddenChatList.map((chat) =>
    chat.publicId === threadId
      ? { ...chat, isMuted }
      : chat
  );

  // ✅ update active thread (THIS WAS MISSING 🔥)
  if (state.activeThreadId === threadId) {
    state.isMute = isMuted;

    if (state.activeThreadDetails?.permissions) {
      state.activeThreadDetails.permissions.isMuted = isMuted;
    }
  }
})

      .addCase(hideThread.fulfilled, (state, action) => {
        const { threadPublicId, isHidden } = action.payload;

        if (isHidden) {
          // Move from visible → hidden
          const thread = state.chatList.find(
            (chat) => chat.publicId === threadPublicId,
          );

          if (thread) {
            state.hiddenChatList.unshift(thread);
            state.chatList = state.chatList.filter(
              (chat) => chat.publicId !== threadPublicId,
            );
          }
        } else {
          // Move from hidden → visible
          const thread = state.hiddenChatList.find(
            (chat) => chat.publicId === threadPublicId,
          );

          if (thread) {
            state.chatList.unshift(thread);
            state.hiddenChatList = state.hiddenChatList.filter(
              (chat) => chat.publicId !== threadPublicId,
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
        state.isBlockedByYou = perms?.isBlockedByYou || false;
        state.isBlockedByOther = perms?.isBlockedByOther || false;
        state.isBlocked =
          perms?.isBlockedByYou || perms?.isBlockedByOther || false;
      })
      // Delete
      .addCase(deleteThread.fulfilled, (state, action) => {
        const threadId = action.meta.arg;

        // ✅ remove from sidebar smoothly
        state.chatList = state.chatList.filter(
          (chat) => chat.publicId !== threadId,
        );

        // ✅ only clear messages IF it's active thread
        if (state.activeThreadId === threadId) {
          state.messages = [];
          state.activeThreadId = null; // 👈 important
        }
      })

      .addCase(clearConversation.fulfilled, (state, action) => {
        const threadId = action.payload;

        // ✅ only clear messages (not remove thread)
        if (state.activeThreadId === threadId) {
          state.messages = [];
        }

        // ✅ optional: reset last message in sidebar
        state.chatList = state.chatList.map((chat) =>
          chat.publicId === threadId
            ? { ...chat, lastMessage: "" }
            : chat
        );
      })
      .addCase(toggleBlockThread.fulfilled, (state, action) => {
        const { threadPublicId, isBlocked } = action.payload;

        // Update sidebar
        const thread = state.chatList.find(
          (t) => t.publicId === threadPublicId,
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
      })
      // .addCase(fetchMessageUnreadCount.fulfilled, (state, action) => {
      //   state.messageUnreadCount = action.payload;
      // });
  },
});

export const {
  setActiveThread,
  setActiveUser,
  addSocketMessage,
  updatePPVStatus,
  markMessagesRead,
  markMessagesReadFromSocket,
  clearMessages,
  // setMessageUnreadCount,
  // incrementUnread,
  // resetUnread,
  resetThreadUnread,
  setCurrentUser,
  updateUserOnlineStatus,
  setThreadDetails,
} = messageSlice.actions;

export default messageSlice.reducer;

export const selectTotalUnread = (state: RootState) =>
  state.message.chatList.reduce(
    (sum, chat) => sum + (chat.unreadCount || 0),
    0
  );
