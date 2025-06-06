import { Col, Layout, Popover, Row, Select } from "antd";
import { Link, Outlet } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../utils/SocketContext";
import { SettingOutlined } from "@ant-design/icons";
import SideBar from "./Sidebar";
import { useGetUserQuery } from "../../store/services/UserService";
import { getLocalStorage } from "../../hooks/localStorage";

const { Header } = Layout;

const LayoutPage = () => {
  const socket = useContext(SocketContext);
  const account = useGetUserQuery();
  const [keyRender, setKeyRender] = useState(0);

  socket.on("update-friend", (data) => {
    console.log(data);
  });
  const content = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  );
  const user = getLocalStorage({ key: "user" });

  const options = account?.data
    ?.filter((item) => item._id !== user._id)
    ?.map((item) => ({
      value: item._id,
      label: `${item.name} - ${item.email}`,
    }));

  const handleChange = (value: number) => {
    socket.emit("add-friend", {
      id: value,
    });
    setKeyRender((pre) => pre + 1);
  };
  useEffect(() => {
    console.log("User data:", user);
  }, [user]);

  return (
    <SocketContext.Provider value={socket}>
      <Layout style={{ height: "100vh" }}>
        <Header className="flex justify-center items-center bg-cyan-700">
          <Select
            className="w-full"
            showSearch
            allowClear
            placeholder="Select a person"
            optionFilterProp="label"
            onChange={handleChange}
            options={options}
          />
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
          <Popover
            content={content}
            title="Title"
            trigger="click"
            className="flex grow justify-end"
          >
            <SettingOutlined className="text-white text-2xl" />
          </Popover>
        </Header>

        <Layout>
          <Row gutter={16} className="!mx-0 ">
            <Col span={6}>
              <SideBar key={keyRender} />{" "}
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
