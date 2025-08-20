// SocketContext.js
import { createContext } from "react";
import { io } from "socket.io-client";

export const createSocket = () => {
  const socket = io(import.meta.env.VITE_API_URL);
  return socket;
};
export const SocketContext = createContext(createSocket);
