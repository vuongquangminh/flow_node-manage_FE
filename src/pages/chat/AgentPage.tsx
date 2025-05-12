import { useContext, useEffect, useRef, useState } from "react";
import { Button, Input } from "antd";
import { Socket } from "socket.io-client";
import { SocketContext } from "../../utils/SocketContext";

const AgentPage = () => {
  const socket = useContext(SocketContext);
  const socketRef = useRef<Socket | null>(null);
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState<
    { type: string; message: string }[]
  >([]);
  useEffect(() => {
    socketRef.current = socket;

    socket.on("connect", () => {
      // console.log("Connected to WebSocket server", socket.id);
    });
    const handleAgentResponse = (data: string) => {
      console.log("data: ", data);
      setConversation((pre) => [
        ...pre,
        {
          type: "answer",
          message: data,
        },
      ]);
    };
    socket.on("ai-agent-realtime-response", handleAgentResponse);

    socket.on("disconnect", () => {
      // console.log("Disconnected from server");
    });
    return () => {
      socket.off("ai-agent-realtime-response", handleAgentResponse);
    };
  }, []);

  const handleSend = (message: string) => {
    if (socketRef.current && message.length > 0) {
      socketRef.current.emit("user-send-ai-agent-realtime", message);
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
  return (
    <>
      <div className="h-full flex flex-col justify-between p-4">
        <div className="">
          <h1 className="text-3xl font-bold text-blue-600">AI Aigent</h1>
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
};

export default AgentPage;
