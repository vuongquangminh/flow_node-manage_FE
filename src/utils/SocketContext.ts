// SocketContext.js
import { createContext } from "react";
import { io } from "socket.io-client";
import { getLocalStorage } from "../hooks/localStorage";

const user = getLocalStorage({ key: "user" });

export const socket = io("http://localhost:3000", {
  query: { user: JSON.stringify(user) },
});
export const SocketContext = createContext(socket);
