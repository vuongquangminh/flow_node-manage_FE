import io from "socket.io-client";
import { useEffect, useState } from "react";
import { Input } from "antd";
import { useGetUserByIdQuery } from "../../store/services/UserService";
export default function DashboardPage() {
  const socket = io("http://localhost:3000"); // URL backend

  // const res = useGetUserByIdQuery({ name: "Thuy" });

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });
  }, []);
  useEffect(() => {
    // socket.emit("change-flow", { name: "Thuy", email: "" });
    // socket.on("flow-updated", (data) => {});
  }, []);

  return (
    <div className="h-full">
      <Input placeholder="Basic usage" />
    </div>
  );
}
