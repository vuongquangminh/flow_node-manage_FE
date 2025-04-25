import io from "socket.io-client";
import "@xyflow/react/dist/style.css";
import { useEffect, useState } from "react";
import { Input } from "antd";
import { useGetUserByIdQuery } from "../../store/services/UserService";
export default function FlowPage() {
  const socket = io("http://localhost:3000"); // URL backend

  const res = useGetUserByIdQuery({ name: "Thuy" });

  const [init, setInit] = useState(res.data?.email);
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });
  }, []);
  useEffect(() => {
    socket.emit("change-flow", { name: "Thuy", email: init });
    socket.on("flow-updated", (data) => {
      setInit(data.email);
    });
  }, [init]);
  console.log("init: ", init);

  useEffect(() => {
    if (res.data?.email) {
      setInit(res.data.email);
    }
  }, [res.data]);
  return (
    <div className="h-full">
      <Input
        placeholder="Basic usage"
        value={init}
        onChange={(value) => setInit(value.target.value)}
      />
    </div>
  );
}
