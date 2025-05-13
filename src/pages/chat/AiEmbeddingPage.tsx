import { useContext, useEffect, useRef, useState } from "react";
import { Button, Input } from "antd";
import { Socket } from "socket.io-client";
import { SocketContext } from "../../utils/SocketContext";

export default function AiEmbeddingPage() {
  const socket = useContext(SocketContext);
  const socketRef = useRef<Socket | null>(null);
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState<
    { type: string; message: string }[]
  >([]);
  // const sessionId = useRef(uuidv4());
  useEffect(() => {
    socketRef.current = socket;

    socket.on("connect", () => {
      // console.log("Connected to WebSocket server", socket.id);
    });
    const handleChatbotResponse = (data: string) => {
      setConversation((pre) => [
        ...pre,
        {
          type: "answer",
          message: data,
        },
      ]);
    };

    socket.on("chat-embedding-response", handleChatbotResponse);

    socket.on("disconnect", () => {
      // console.log("Disconnected from server");
    });

    // Cleanup để tránh lặp listener
    return () => {
      socket.off("chat-embedding-response", handleChatbotResponse);
    };
  }, []);

  const handleSend = (message: string) => {
    // const config = { configurable: { sessionId }, streamMode: "values" };
    if (socketRef.current && message.length > 0) {
      socketRef.current.emit("user-send-chat-embedding", message);
    }
    setConversation((pre) => [
      ...pre,
      {
        type: "sender",
        message: message,
      },
    ]);
    setMessage("");
  };

  console.log("conversation: ", conversation);

  return (
    <>
      <div className="h-full flex flex-col justify-between p-4">
        <div className="">
          <h1 className="text-3xl font-bold text-blue-600">
            Chatbot Embedding
          </h1>
          <div className="">
            {conversation?.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`flex mb-2 ${
                    item.type == "sender" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-2xl shadow ${
                      item.type == "sender"
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
