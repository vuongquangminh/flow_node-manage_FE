import { useEffect, useRef, useState } from "react";
import { Button, Input } from "antd";
import io, { Socket } from "socket.io-client";

export default function DashboardPage() {
  const socketRef = useRef<Socket | null>(null);
  const [message, setMessage] = useState("");
  const [new_message, setNewMessage] = useState("");

  useEffect(() => {
    const socket = io("http://localhost:3000");
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Connected to WebSocket server", socket.id);
    });

    socket.on("conversation-updated", (data) => {
      console.log("Received from server:", data);
      setNewMessage(data.message);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

  }, []);

  const handleSend = () => {
    if (socketRef.current) {
      socketRef.current.emit("sent-message", {
        name: "Thuy",
        message: message,
      });
      console.log("Sent:", message);
    }
  };

  return (
    <div className="h-full flex items-end">
      {new_message}
      <Input
        placeholder="Nhập email hoặc tin nhắn"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button type="primary" className="mx-4" onClick={handleSend}>
        Send
      </Button>
    </div>
  );
}
