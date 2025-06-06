// SocketContext.js
import { createContext } from "react";
import { io } from "socket.io-client";

export const socket = (data: string) =>
  io("http://localhost:3000", {
    query: { user: data },
  });
export const socketFn = (data: string) => {
  return io("http://localhost:3000", {
    query: { user: data },
  });
};
export const SocketContext = createContext(socketFn);
