import { socketBaseUrl } from "@/utils/constance";
import { io, Socket } from "socket.io-client";

const socketOptions = {
  autoConnect: true,
  reconnection: true,
  reconnectionDelay: 500,
  reconnectionDelayMax: 1000,
  reconnectionAttempts: Infinity,
  transports: ["websocket", "polling"],
};

const socket: Socket = io(socketBaseUrl, socketOptions);
socket.on("connect", () => {
  console.log("Connected with id:", socket.id);
});

export default socket;
