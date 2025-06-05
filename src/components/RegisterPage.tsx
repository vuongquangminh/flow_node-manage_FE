import { UserOutlined } from "@ant-design/icons";
import { Alert, Button, Form, Input, notification } from "antd";
import { useCreateUserMutation } from "../store/services/UserService";
import { useTranslation } from "react-i18next";

const RegisterPage = () => {
  const [form] = Form.useForm();
  const [doCreate, insert] = useCreateUserMutation();
  const [api, contextHolder] = notification.useNotification();
  const { t } = useTranslation();

  const onFinish = (values: {
    email: string;
    password: string;
    name: string;
  }) => {
    doCreate(values)
      .unwrap()
      .then(() => {
        api.success({
          message: t("success"),
          description: t("feature_success", { name: t("regiter") }),
        });
      })
      .catch((error) => {
        api.error({
          message: t("failed"),
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
          <Alert
            message={t("register")}
            type="info"
            showIcon
            className=" my-5"
          />

          <Form.Item
            label={t("name")}
            name="name"
            rules={[
              {
                required: true,
                message: t("please_field_required", { field: t("name") }),
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder={t("email")} />
          </Form.Item>
          <Form.Item
            label={t("email")}
            name="email"
            rules={[{ required: true, message: t("please_field_required", { field: t("email") }) }]}
          >
            <Input prefix={<UserOutlined />} placeholder={t("email")} />
          </Form.Item>
          <Form.Item
            label={t("password")}
            name="password"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          {/* Field */}
          <Form.Item
            label={t("confirm_password")}
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
            loading={insert.isLoading}
          >
            {t("register")}
          </Button>
        </Form>
      </div>
    </>
  );
};
export default RegisterPage;
