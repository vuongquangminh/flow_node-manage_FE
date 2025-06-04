import { Col, Layout, Row } from "antd";
import SideBar from "./Sidebar";
import { Link, Outlet} from "react-router-dom";
import { useContext, useState } from "react";
import { SocketContext } from "../../utils/SocketContext";

const { Header } = Layout;

const LayoutPage = () => {
  const socket = useContext(SocketContext);
  const [keyRender, setKeyRender] = useState(0);

  socket.on("update-friend", (data) => {
    console.log(data);
    setKeyRender((pre) => pre + 1);
  });

  return (
    <SocketContext.Provider value={socket}>
      <Layout style={{ height: "100vh" }}>
        <Header className="flex justify-center items-center bg-cyan-700">
          <Link to={"/chatbot"} className="w-10 ml-3">
            <img className="h-full w-full rounded" src="/logo-gpt.jpg" alt="" />
          </Link>
          <Link to={"/ai-agent"} className="w-10 mx-3">
            <img className="h-full w-full rounded" src="/ai-agent.jpg" alt="" />
          </Link>
          <Link to={"/chat-tool"} className="w-10">
            <img
              className="h-full w-full rounded"
              src="/chat-tool.jpg"
              alt=""
            />
          </Link>
          <Link to={"/ai-embedding"} className="w-10 mx-3">
            <img
              className="h-full w-full rounded"
              src="/embedding.jpg"
              alt=""
            />
          </Link>
        </Header>

        <Layout>
          <Row gutter={16} className="!mx-0 h-[100ch]">
            <Col span={6}>
              <SideBar key={keyRender} />
            </Col>
            <Col span={18}>
              <Outlet />
            </Col>
          </Row>
        </Layout>
      </Layout>
    </SocketContext.Provider>
  );
};

export default LayoutPage;
