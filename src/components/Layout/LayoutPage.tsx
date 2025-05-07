import { Col, Layout, Row, Select } from "antd";
import SideBar from "./Sidebar";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { getLocalStorage } from "../../hooks/localStorage";
import { useGetUserQuery } from "../../store/services/UserService";
import { useContext, useState } from "react";
import { SocketContext } from "../../utils/SocketContext";

const { Header, Footer } = Layout;

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#4096ff",
};

const LayoutPage = () => {
  const navigate = useNavigate();
  const account = useGetUserQuery();
  const socket = useContext(SocketContext);
  const [keyRender, setKeyRender] = useState(0);
  const user = getLocalStorage({ key: "user" });
  if (!user) {
    navigate("/");
  }

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
  };
  socket.on("update-friend", (data) => {
    console.log(data);
    setKeyRender((pre) => pre + 1);
  });

  return (
    <SocketContext.Provider value={socket}>
      <Layout style={{ height: "100vh" }}>
        <Header className="flex justify-center items-center bg-cyan-700">
          <Select
            className="w-full mx-3"
            showSearch
            allowClear
            placeholder="Select a person"
            optionFilterProp="label"
            onChange={handleChange}
            options={options}
          />
          <Link to={'/chatbot'} className="w-10">
            <img className="h-full w-full rounded" src="/logo-gpt.jpg" alt="" />
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
        <Footer style={footerStyle}>Footer</Footer>
      </Layout>
    </SocketContext.Provider>
  );
};

export default LayoutPage;
