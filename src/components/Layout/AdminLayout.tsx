import { Layout, Menu } from "antd";
import {
  UserOutlined,
  ShoppingCartOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { Link, Outlet, useLocation } from "react-router-dom";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNotice } from "../../utils";
import { getLocalStorage } from "../../hooks/localStorage";
import { BookOpenText } from "lucide-react";
import ModelConfirm from "../ModelConfirm";

const { Content, Sider } = Layout;

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const { noticeSuccess, contextHolder } = useNotice();
  const user = getLocalStorage({ key: "user" });
  const [isLogout, setIsLogout] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    noticeSuccess("logout");
  };
  return (
    <>
      {contextHolder}
      <Layout className="max-h-screen min-h-screen">
        <Sider breakpoint="lg" collapsedWidth="0">
          <div className="h-16 m-4 text-white text-center font-bold text-xl">
            Admin Panel
          </div>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[location.pathname]}
            items={[
              {
                key: "/admin/users",
                icon: <UserOutlined />,
                label: <Link to="/admin/users">Users</Link>,
              },
              {
                key: "/admin/orders",
                icon: <ShoppingCartOutlined />,
                label: <Link to="/admin/orders">Orders</Link>,
              },
              {
                key: "/admin/products",
                icon: <BookOpenText />,
                label: <Link to="/admin/products">Products</Link>,
              },
            ]}
          />
          <div className="absolute bottom-0 w-full">
            <Menu
              theme="dark"
              mode="inline"
              selectable={false}
              items={[
                {
                  key: "login",
                  icon: <LoginOutlined />,
                  label: (
                    <div onClick={() => setIsLogout(true)}>{user.email}</div>
                  ),
                },
              ]}
            />
          </div>
        </Sider>
        <Layout>
          <Content className="mt-6 mr-4 mb-0 overflow-y-auto">
            <div className="p-6 bg-white min-h-full">
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
      <ModelConfirm
        title={t("delete")}
        content={t("confirm_logout")}
        isOpen={isLogout}
        onOk={() => handleLogout()}
        onCancel={() => setIsLogout(false)}
      />
    </>
  );
};

export default AdminLayout;
