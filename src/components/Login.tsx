import { Button, Form, FormProps, Input, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../store/services/UserService";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { setLocalStorage } from "../hooks/localStorage";

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
      navigate("/user");
    } else {
      api.error({
        message: "Thất bại",
        description: (response.error as FetchBaseQueryError)?.data as string,
      });
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <div className="">
        {contextHolder}
        <Form
          name="basic"
          //   labelCol={{ span: 8 }}
          //   wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        <p className="text-red-700 text-3xl">Minh</p>
      </div>
    </>
  );
};

export default LoginPage;
