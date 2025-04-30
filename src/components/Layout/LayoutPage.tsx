import { Col, Layout, Row } from "antd";
import SideBar from "./Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useGetUserByIdQuery } from "../../store/services/UserService";
import { getLocalStorage } from "../../hooks/localStorage";

const { Header, Footer } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 48,
  lineHeight: "64px",
  backgroundColor: "#4096ff",
};

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#4096ff",
};

const LayoutPage = () => {
  const navigate = useNavigate();

  const user = getLocalStorage({ key: "user" });
  const res = useGetUserByIdQuery({ id: user?._id }, { skip: !user });
  console.log(!user, res);
  if (!user) {
    navigate("/");
  }
  return (
    <Layout style={{ height: "100vh" }}>
      <Header style={headerStyle}>Header</Header>
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
