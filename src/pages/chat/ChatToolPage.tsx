import { useContext, useEffect, useRef, useState } from "react";
import { Button, Input } from "antd";
import { Socket } from "socket.io-client";
import { SocketContext } from "../../utils/SocketContext";

export default function ChatToolPage() {
  const socket = useContext(SocketContext);
  const socketRef = useRef<Socket | null>(null);
  const [message, setMessage] = useState("");
  const [answer, setAnswer] = useState("");
  useEffect(() => {
    socketRef.current = socket;

    socket.on("connect", () => {
      // console.log("Connected to WebSocket server", socket.id);
    });
    socket.on("chatTool-response", (data) => {
      setAnswer(data);
    });

    socket.on("disconnect", () => {
      // console.log("Disconnected from server");
    });
  }, []);

  const handleSend = (message: string) => {
    if (socketRef.current && message.length > 0) {
      socketRef.current.emit("user-send-chatTool", message);
    }
    setMessage("");
  };

  return (
    <>
      <div className="h-full flex flex-col justify-between p-4">
        <h1 className="text-3xl font-bold text-blue-600">Chat Tool</h1>
        <div className="">{answer}</div>
        <form
          onSubmit={(e) => {
            e.preventDefault(); // ngăn reload
            handleSend(message);
          }}
        >
          <div className="flex items-end">
            <Input
              placeholder="Nhập email hoặc tin nhắn"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button type="primary" className="mx-4" htmlType="submit">
              Send
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
