// SocketContext.js
import { createContext } from "react";
import { io } from "socket.io-client";
import { getLocalStorage } from "../hooks/localStorage";

export const createSocket = () => {
  const user = getLocalStorage({ key: "user" });
  const socket = io(import.meta.env.VITE_API_URL, {
    query: { user: JSON.stringify(user) },
  });
  return socket;
} 
export const SocketContext = createContext(createSocket);
