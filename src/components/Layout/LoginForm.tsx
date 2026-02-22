import { Button, Flex, Form, Input } from "antd";
import {
  useCreateUserMutation,
  useLoginMutation,
} from "../../store/services/UserService";
import { setLocalStorage } from "../../hooks/localStorage";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LockOutlined, PhoneFilled, UserOutlined } from "@ant-design/icons";

function LoginForm({
  setShowLogin,
  noticeSuccess,
  noticeError,
  isRegister,
  setIsRegister
}: {
  setShowLogin: (value: boolean) => void;
  noticeSuccess: (message: string) => void;
  noticeError: (message: string) => void;
  isRegister: boolean;
    setIsRegister: (value: boolean) => void;
}) {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [doLogin] = useLoginMutation();
  const [doRegister] = useCreateUserMutation();

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
          if (res.data.user.role === "admin") {
            navigate("/admin/users");
          }
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
                    return Promise.reject(new Error(t("password_not_match")));
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

        <div className="text-center text-sm text-gray-600">
          {t("had_account")}
          <p
            onClick={() => setIsRegister(!isRegister)}
            className="text-indigo-600 cursor-pointer hover:text-indigo-800 hover:underline transition-colors duration-200"
          >
            {isRegister ? t("login") : t("register")}
          </p>
        </div>
      </Form>
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
    </>
  );
}

export default LoginForm;
