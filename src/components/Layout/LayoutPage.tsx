import { Button, Col, Layout, Row, Select } from "antd";
import SideBar from "./Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { getLocalStorage } from "../../hooks/localStorage";
import { useGetUserQuery } from "../../store/services/UserService";
import { useAddFriendMutation } from "../../store/services/FriendService";
import { useContext } from "react";
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
    socket.on("update-friend", (data) => {
      console.log("data2: ", data);
    });
  };

  return (
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
      </Header>

      <Layout>
        <Row gutter={16} className="!mx-0 h-[100ch]">
          <Col span={6}>
            <SideBar />
          </Col>
          <Col span={18}>
            <Outlet />
          </Col>
        </Row>
      </Layout>
      <Footer style={footerStyle}>Footer</Footer>
    </Layout>
  );
};

export default LayoutPage;
