import { useContext, useEffect, useRef, useState } from "react";
import { Button, Input } from "antd";
import { getLocalStorage } from "../../hooks/localStorage";
import { Socket } from "socket.io-client";
import { useParams } from "react-router-dom";
import { useGetHistoryMessageQuery } from "../../store/services/ChatService";
import { SocketContext } from "../../utils/SocketContext";

export default function ChatPagePage() {
  const socket = useContext(SocketContext);
  const socketRef = useRef<Socket | null>(null);
  const [message, setMessage] = useState("");
  const user = getLocalStorage({ key: "user" });
  const params = useParams();
  const res = useGetHistoryMessageQuery({
    sender_id: user._id,
    receiver_id: Number(params.id),
  });

  useEffect(() => {
    socketRef.current = socket;

    socket.on("connect", () => {
      // console.log("Connected to WebSocket server", socket.id);
    });

    socket.on("conversation-updated", (data) => {
      res.refetch();
    });

    socket.on("disconnect", () => {
      // console.log("Disconnected from server");
    });
  }, []);

  useEffect(() => {
    res.refetch();
  }, [params.id]);
  const handleSend = (message: string) => {
    if (socketRef.current && message.length > 0) {
      socketRef.current.emit("sent-message", {
        name: user.name,
        sender_id: user._id,
        receiver_id: params.id,
        name_receiver: params.name,
        message: message,
      });
    }
    setMessage("");
  };

  return (
    <>
      <div className="h-full flex flex-col justify-between p-4">
        <div className="">
          {res.data?.map((item) => {
            return (
              <div
                key={item._id}
                className={`flex mb-2 ${
                  user._id == item.sender_id ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-2xl shadow ${
                    user._id == item.sender_id
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-gray-200 text-gray-800 rounded-bl-none"
                  }`}
                >
                  {item.message}
                </div>
              </div>
            );
          })}
        </div>
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
