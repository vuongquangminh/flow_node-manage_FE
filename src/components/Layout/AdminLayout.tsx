import { Button, Drawer, Flex, Form, Input, Layout, Menu } from "antd";
import {
  UserOutlined,
  ShoppingCartOutlined,
  SettingOutlined,
  LoginOutlined,
  LockOutlined,
  PhoneFilled,
} from "@ant-design/icons";
import { Link, Outlet, useLocation } from "react-router-dom";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  useCreateUserMutation,
  useLoginMutation,
} from "../../store/services/UserService";
import { useNotice } from "../../utils";
import { setLocalStorage } from "../../hooks/localStorage";

const { Header, Content, Sider } = Layout;

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const [showLogin, setShowLogin] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [doRegister] = useCreateUserMutation();
  const { noticeSuccess, noticeError, contextHolder } = useNotice();
  const [doLogin] = useLoginMutation();

  const onLogin = async (values: {
    email: string;
    password: string;
    name: string;
    address?: string;
    phone?: string;
  }) => {
    try {
      if (isRegister) {
        const res = await doRegister(values).unwrap();

        if (res) {
          noticeSuccess("register");
          setIsRegister(false);
        }
      } else {
        const res = await doLogin(values);
        if (res?.data?.status) {
          setLocalStorage({ key: "token", value: res.data.token });
          setLocalStorage({ key: "user", value: res.data.user });
          noticeSuccess("login");
          setShowLogin(false);
        } else {
          const errorMsg =
            res?.error &&
            "data" in res.error &&
            (res.error as { data?: { error?: string } })?.data?.error;
          noticeError(errorMsg ? errorMsg : t("fail"));
        }
      }
    } catch (err) {
      const errorMsg = (err as { data?: { error?: string } })?.data?.error;
      noticeError(errorMsg || t("error"));
    }
  };
  const onLoginOA2 = async (service: string) => {
    if (service == "github") {
      window.location.href = "http://localhost:3000/auth/github";
    } else if (service == "google") {
      window.location.href = "http://localhost:3000/auth/google";
    }
  };
  return (
    <>
      {contextHolder}
      <Layout style={{ minHeight: "100vh" }}>
        <Sider breakpoint="lg" collapsedWidth="0">
          <div
            style={{
              height: 64,
              margin: 16,
              color: "#fff",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
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
                icon: <SettingOutlined />,
                label: <Link to="/admin/products">Products</Link>,
              },
            ]}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
            }}
          >
            <Menu
              theme="dark"
              mode="inline"
              selectable={false}
              items={[
                {
                  key: "login",
                  icon: <LoginOutlined />,
                  label: <div>Login</div>,
                  onClick: () => setShowLogin(true),
                },
              ]}
            />
          </div>
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }} />
          <Content style={{ margin: "24px 16px 0" }}>
            <div style={{ padding: 24, background: "#fff", minHeight: "100%" }}>
              <Outlet />
            </div>
          </Content>
        </Layout>
        <Drawer
          closable
          destroyOnHidden
          title={<p className="text-2xl font-semibold">{t("login")}</p>}
          width={500}
          placement="right"
          open={showLogin}
          onClose={() => setShowLogin(false)}
        >
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onLogin}
            className="space-y-6"
          >
            {isRegister && (
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: t("please_field_required", { field: "name" }),
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="text-gray-500" />}
                  placeholder="Name"
                  className="rounded-lg border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 py-2.5 px-4"
                />
              </Form.Item>
            )}
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: t("please_field_required", { field: "email" }),
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="text-gray-500" />}
                placeholder="Email"
                className="rounded-lg border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 py-2.5 px-4"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: t("please_field_required", { field: "password" }),
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="text-gray-500" />}
                type="password"
                placeholder="Password"
                className="rounded-lg border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 py-2.5 px-4"
              />
            </Form.Item>
            {isRegister && (
              <>
                <Form.Item
                  name="password2"
                  dependencies={["password"]}
                  rules={[
                    {
                      required: true,
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(t("password_not_match"))
                        );
                      },
                    }),
                  ]}
                >
                  <Input
                    prefix={<LockOutlined className="text-gray-500" />}
                    type="password"
                    placeholder={t("password_confirm")}
                    className="rounded-lg border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 py-2.5 px-4"
                  />
                </Form.Item>

                <Form.Item
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: t("please_field_required", { field: "phone" }),
                    },
                  ]}
                >
                  <Input
                    prefix={<PhoneFilled className="text-gray-500" />}
                    placeholder={t("phone")}
                    className="rounded-lg border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 py-2.5 px-4"
                  />
                </Form.Item>
                <Form.Item
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: t("please_field_required", { field: "address" }),
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="text-gray-500" />}
                    placeholder={t("address")}
                    className="rounded-lg border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 py-2.5 px-4"
                  />
                </Form.Item>
              </>
            )}
            <Form.Item>
              <Flex justify="end">
                <a
                  href="#"
                  className="text-sm text-indigo-600 hover:text-indigo-800 hover:underline transition-colors duration-200"
                >
                  {t("forgot_password")}
                </a>
              </Flex>
            </Form.Item>
            <Form.Item>
              <Button
                block
                type="primary"
                htmlType="submit"
                className="bg-indigo-600 hover:bg-indigo-700 rounded-lg py-2.5 text-white font-medium transition-colors duration-200"
              >
                {t("login")}
              </Button>
            </Form.Item>
            <div className="flex justify-center mt-2">
              <button
                className="w-12 mx-2 rounded"
                onClick={() => onLoginOA2("github")}
              >
                <img
                  className="w-full rounded"
                  src="/images/logo-github.png"
                  alt=""
                />
              </button>
              <button
                className="w-12 p-2 rounded"
                onClick={() => onLoginOA2("google")}
              >
                <img
                  className="w-full rounded"
                  src="/images/logo-google.png"
                  alt=""
                />
              </button>
            </div>
            <div className="text-center text-sm text-gray-600">
              {t("had_account")}
              <p
                onClick={() => setIsRegister(true)}
                className="text-indigo-600 cursor-pointer hover:text-indigo-800 hover:underline transition-colors duration-200"
              >
                {t("register")}
              </p>
            </div>
          </Form>
        </Drawer>
      </Layout>
    </>
  );
};

export default AdminLayout;
