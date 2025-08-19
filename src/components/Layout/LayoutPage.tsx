import { Button, Col, Input, Row } from "antd";
import { Outlet } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { getLocalStorage } from "../../hooks/localStorage";
import Header from "./Header";
import { MessageCircle } from "lucide-react";
import { SocketContext } from "../../utils/SocketContext";
import { Socket } from "socket.io-client";
import { useTranslation } from "react-i18next";

const LayoutPage = () => {
  const { t } = useTranslation();
  const socket = useContext(SocketContext)();
  const socketRef = useRef<Socket | null>(null);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const user = getLocalStorage({ key: "user" });
  const [conversation, setConversation] = useState<
    { type: string; message: string }[]
  >([]);
  useEffect(() => {
    console.log("User data:", user);
  }, [user]);

  const handleSend = (message: string) => {
    if (socketRef.current && message.length > 0) {
      socketRef.current.emit("user-send-chatbot", { message });
    }
    setConversation((pre) => [
      ...pre,
      ...(response.length > 0
        ? [
            {
              type: "answer",
              message: response,
            },
          ]
        : []),
      {
        type: "sender",
        message: message,
      },
    ]);
    setMessage("");
    setResponse("");
  };
  useEffect(() => {
    socketRef.current = socket;

    socket.on("connect", () => {
      // console.log("Connected to WebSocket server", socket.id);
    });
    const handleChatbotResponse = (token: string) => {
      console.log("token:", token);
      setResponse((pre) => pre + token);
    };

    socket.on("chatbot-response", handleChatbotResponse);

    socket.on("disconnect", () => {
      // console.log("Disconnected from server");
    });

    // Cleanup để tránh lặp listener
    return () => {
      socket.off("chatbot-response", handleChatbotResponse);
    };
  }, []);

  return (
    <>
      <SocketContext.Provider value={() => socket}>
        <div className=" items-center justify-items-center font-[family-name:var(--font-geist-sans)]">
          <Header />
          <p className="text-primary py-2">
            🎒Buy a backpack = get a free front pocket, code
            <strong>FREEGIFT</strong>
            <a href="/">– See terms</a>
          </p>
        </div>
        <Row gutter={16} className="!mx-0 h-full">
          <Col span={24}>
            <Outlet />
          </Col>
        </Row>
        <button
          onClick={() => setOpen(!open)}
          className="fixed bottom-6 right-6 bg-primary text-white rounded-full p-4 shadow-lg hover:scale-110 transition"
        >
          <MessageCircle size={24} />
        </button>
        {open && (
          <div className="fixed bottom-20 right-6 w-80 h-96 bg-white shadow-2xl rounded-2xl flex flex-col overflow-hidden">
            <div className="bg-primary text-white px-4 py-2 font-semibold">
              💬 Chat with us
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-2">
              {conversation?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`flex mb-2 ${
                      item.type == "sender" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-2xl shadow whitespace-pre-line ${
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
              {response.length > 0 && (
                <div className="whitespace-pre-line">{response}</div>
              )}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault(); // ngăn reload
                handleSend(message);
              }}
            >
              <div className="flex p-2 border-t">
                <Input
                  placeholder={t("enter_message")}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Button type="primary" className="mx-4" htmlType="submit">
                  {t("send")}
                </Button>
              </div>
            </form>
          </div>
        )}
      </SocketContext.Provider>
    </>
  );
};

export default LayoutPage;
