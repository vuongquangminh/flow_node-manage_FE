import { UserOutlined } from "@ant-design/icons";
import { Alert, Button, Form, Input, notification } from "antd";
import { useCreateUserMutation } from "../store/services/UserService";

const RegisterPage = () => {
  const [form] = Form.useForm();
  const [doCreate, insert] = useCreateUserMutation();
  const [api, contextHolder] = notification.useNotification();

  const onFinish = (values: {
    email: string;
    password: string;
    name: string;
  }) => {
    doCreate(values)
      .unwrap()
      .then(() => {
        api.success({
          message: "Thành công",
          description: "Đăng ký tài khoản thành công",
        });
      })
      .catch((error) => {
        api.error({
          message: "Thất bại",
          description: error.data.error,
        });
      });
  };

  return (
    <>
      {contextHolder}
      <div className="flex justify-center h-screen items-center">
        <Form
          form={form}
          name="dependencies"
          autoComplete="off"
          style={{ maxWidth: 600 }}
          layout="vertical"
          onFinish={onFinish}
        >
          <Alert message="Đăng ký" type="info" showIcon className=" my-5" />

          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          {/* Field */}
          <Form.Item
            label="Confirm Password"
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
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input />
          </Form.Item>

          <Button
            block
            type="primary"
            htmlType="submit"
            loading={insert.loading}
          >
            Đăng ký
          </Button>
          {/* Render Props */}
        </Form>
      </div>
    </>
  );
};
export default RegisterPage;
