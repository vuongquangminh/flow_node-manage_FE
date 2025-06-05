import {
  Button,
  Checkbox,
  Flex,
  Form,
  FormProps,
  Input,
  notification,
} from "antd";
import { useLoginMutation } from "../store/services/UserService";
import { setLocalStorage } from "../hooks/localStorage";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

type FieldType = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const [doLogin] = useLoginMutation();
  const { t } = useTranslation();
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const response = await doLogin(values);
    if (response?.data?.status) {
      setLocalStorage({ key: "token", value: response.data.token });
      setLocalStorage({ key: "user", value: response.data.user });
      navigate("/conversation");
    } else {
      api.error({
        message: t("loading"),
        description:
          (response.error &&
            "data" in response.error &&
            (response.error as { data?: { error?: string } }).data?.error) ||
          t("error"),
      });
    }
  };
  const handleLogin = async () => {
    window.location.href = "http://localhost:3000/auth/github";
  };

  return (
    <div className="w-full bg-login bg-no-repeat bg-center bg-cover">
      {contextHolder}
      <div className="flex justify-center items-center h-screen">
        <Form
          name={t("login")}
          initialValues={{ remember: true }}
          style={{ maxWidth: 360 }}
          onFinish={onFinish}
          className="p-8 backdrop-contrast-50 rounded-xl"
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: t("please_field_required", { field: t("email") }),
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder={t("email")} />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: t("please_field_required", { field: t("password") }),
              },
            ]}
          >
            <Input
              prefix={<LockOutlined />}
              type={t("password")}
              placeholder={t("password")}
            />
          </Form.Item>
          <Form.Item>
            <Flex justify="space-between" align="center">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>{t("remember_me")}</Checkbox>
              </Form.Item>
              <Link to={"/forgot-password"}>{t("forgot_password")}</Link>
            </Flex>
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit">
              {t("login")}
            </Button>
            or <Link to={"/register"}>{t("register")}</Link>
            <button onClick={handleLogin}>
              {t("login_with_name", { name: "Github" })}
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
