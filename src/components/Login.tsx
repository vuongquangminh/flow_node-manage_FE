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

type FieldType = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const [doLogin] = useLoginMutation();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const response = await doLogin(values);
    if (response?.data?.status) {
      setLocalStorage({ key: "token", value: response.data.token });
      setLocalStorage({ key: "user", value: response.data.user });
      navigate("/conversation");
    } else {
      api.error({
        message: "Thất bại",
        description: response.error.data.error,
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
          name="login"
          initialValues={{ remember: true }}
          style={{ maxWidth: 360 }}
          onFinish={onFinish}
          className="p-8 backdrop-contrast-50 rounded-xl"
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Flex justify="space-between" align="center">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <Link to={"/forgot-password"}>Forgot password</Link>
            </Flex>
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Log in
            </Button>
            or <Link to={"/register"}>Register now!</Link>
            <button onClick={handleLogin}>Login with GitHub</button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
