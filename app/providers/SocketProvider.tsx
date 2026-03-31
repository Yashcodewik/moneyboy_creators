"use client";

import { useEffect, useRef } from "react";
import socket from "@/libs/socket";
import { store, useAppDispatch, useAppSelector } from "@/redux/store";
import {
  addSocketMessage,
  setActiveThread,
  setCurrentUser,
  setMessageUnreadCount,
} from "@/redux/message/messageSlice";
import { useDecryptedSession } from "@/libs/useDecryptedSession";
import { usePathname } from "next/navigation";
import { fetchSidebar } from "@/redux/message/messageActions";

export default function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const { session } = useDecryptedSession();
  const pathname = usePathname();

  const activeThreadId = useAppSelector((s) => s.message.activeThreadId);
  const activeThreadIdRef = useRef<string | null>(activeThreadId);

  useEffect(() => {
    if (!session?.user?.id) return;

    const connectUser = () => {
      console.log("🟢 CONNECT USER EMIT:", session.user.id);
      socket.emit("connectUser", session.user.id);
    };

    if (socket.connected) {
      connectUser();
    }

    socket.on("connect", connectUser);

    return () => {
      socket.off("connect", connectUser);
    };
  }, [session?.user?.id]);

  useEffect(() => {
    activeThreadIdRef.current = activeThreadId;
  }, [activeThreadId]);

  useEffect(() => {
    if (pathname !== "/message") {
      dispatch(setActiveThread(null));
    }
  }, [pathname, dispatch]);

  useEffect(() => {
    if (session?.user?.id) {
      dispatch(setCurrentUser(session.user.id));
    }
  }, [session?.user?.id, dispatch]);

  useEffect(() => {
    if (session?.user?.id) {
      dispatch(fetchSidebar());
    }
  }, [session?.user?.id, dispatch]);

  // ✅ New message + unread count listeners
  useEffect(() => {
    if (!session?.user?.id) return;

    const handleNewMessage = (msg: any) => {
     console.log("📩 SOCKET RECEIVED COUNT:", msg.threadId, Date.now());

      const state = store.getState();
      const chatList = state.message.chatList;

      if (!chatList || chatList.length === 0) {
        console.log("⚠️ Sidebar empty → refetching...");
        dispatch(fetchSidebar());
      }

      dispatch(addSocketMessage(msg));
    };

    const handleUnreadCount = ({ count }: { count: number }) => {
      dispatch(setMessageUnreadCount(count));
    };

    socket.on("newMessage", handleNewMessage);
    socket.on("unreadCount", handleUnreadCount);

    return () => {
      socket.off("newMessage", handleNewMessage);
      socket.off("unreadCount", handleUnreadCount);
    };
  }, [session?.user?.id, dispatch]);

  return <>{children}</>;
}