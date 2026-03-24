"use client";

import { useEffect, useRef } from "react";
import socket from "@/libs/socket";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  addSocketMessage,
  setActiveThread,
  
} from "@/redux/message/messageSlice";
import { useDecryptedSession } from "@/libs/useDecryptedSession";
import { usePathname } from "next/navigation";

export default function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const { session } = useDecryptedSession();


  const pathname = usePathname();

useEffect(() => {
  if (pathname !== "/message") {
    dispatch(setActiveThread(null));
  }
}, [pathname]);

  const activeThreadId = useAppSelector((s) => s.message.activeThreadId);
  const activeThreadIdRef = useRef<string | null>(activeThreadId);
  useEffect(() => {
    activeThreadIdRef.current = activeThreadId;
  }, [activeThreadId]);

  useEffect(() => {
    if (!session?.user?.id) return;

    const connectUser = () => {
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
    if (!session?.user?.id) return;

   const handleNewMessage = (msg: any) => {
  console.log("📩 SOCKET RECEIVED:", msg);

  dispatch(addSocketMessage(msg));

  const receiverId =
    typeof msg.receiverId === "object"
      ? msg.receiverId?._id
      : msg.receiverId;

  const isForMe = receiverId === session.user.id;
  const isActiveThread =
    msg.threadId && msg.threadId === activeThreadIdRef.current;

  console.log("👉 isForMe:", isForMe);
  console.log("👉 isActiveThread:", isActiveThread);
};

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [session?.user?.id, dispatch]);

  return <>{children}</>;
}