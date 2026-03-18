import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteThread, fetchMessages, fetchMessageUnreadCount, fetchSidebar, fetchThreadDetails, hideThread, muteThread, searchMessages, sendMessageAction, toggleBlockThread } from "./messageActions";


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
  isBlockedByYou: boolean;
  isBlockedByOther: boolean;
  hiddenChatList: any[];
  isHidden: boolean;
  messageUnreadCount: number;
  currentUserId: string | null;// 👈 Add currentUserId to state
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
  isBlockedByYou: false,
  isBlockedByOther: false,
  hiddenChatList: [],
  isHidden: false,
  messageUnreadCount: 0,
  currentUserId: null, // 👈 Initialize currentUserId
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
      const msg = action.payload;

      const receiverId =
        typeof msg.receiverId === "object"
          ? msg.receiverId._id
          : msg.receiverId;

      const isReceiver = receiverId === state.currentUserId;
      const isActiveChat = msg.threadId === state.activeThreadId;

      // ✅ ALWAYS update sidebar for receiver
      if (isReceiver) {
        state.chatList = state.chatList.map((chat) => {
          if (chat.publicId === msg.threadId) {
            return {
              ...chat,
              unreadCount: isActiveChat
                ? 0 // 👈 if open, keep 0
                : (chat.unreadCount || 0) + 1,
            };
          }
          return chat;
        });

        // ✅ only increase global unread if NOT active chat
        if (!isActiveChat) {
          state.messageUnreadCount += 1;
        }
      }

      // ✅ ALWAYS push message to chat if active
      if (isActiveChat) {
        const exists = state.messages.some((m) => m._id === msg._id);
        if (!exists) {
          state.messages.push(msg);
        }
      }
    },
    updatePPVStatus: (state, action: PayloadAction<{ ppvId: string; status: string; deliveredMedia?: string[] }>) => {
      const { ppvId, status, deliveredMedia } = action.payload;
      state.messages = state.messages.map((msg) => {
        if (msg.ppvRequestId && msg.ppvRequestId._id?.toString() === ppvId.toString()) {
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
      state.isBlockedByYou = perms?.isBlockedByYou || false;
      state.isBlockedByOther = perms?.isBlockedByOther || false;
      state.isBlocked =
        perms?.isBlockedByYou || perms?.isBlockedByOther || false;
      state.isHidden = perms?.isHidden || false;
    },

    clearMessages: (state) => {
      state.messages = [];
    },
    setMessageUnreadCount: (state, action: PayloadAction<number>) => {
      state.messageUnreadCount = action.payload;
    },

    incrementUnread: (state) => {
      state.messageUnreadCount += 1;
    },

    resetUnread: (state) => {
      state.messageUnreadCount = 0;
    },
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
          const threadId = action.meta.arg;

          // ✅ remove from sidebar smoothly
          state.chatList = state.chatList.filter(
            (chat) => chat.publicId !== threadId
          );

          // ✅ only clear messages IF it's active thread
          if (state.activeThreadId === threadId) {
            state.messages = [];
            state.activeThreadId = null; // 👈 important
          }
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
      })
      .addCase(fetchMessageUnreadCount.fulfilled, (state, action) => {
  state.messageUnreadCount = action.payload;
});
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
  setMessageUnreadCount,
  incrementUnread,
  resetUnread,
  resetThreadUnread,
  setCurrentUser,
  updateUserOnlineStatus,
  setThreadDetails
} = messageSlice.actions;

export default messageSlice.reducer;
