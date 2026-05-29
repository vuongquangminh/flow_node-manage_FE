import { Avatar, Button, Divider, Space, Typography, message } from "antd";
import { TLoginRes } from "../../store/services/UserService"
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

function InforPersonnalAccount({ user, onLogout }: { user: TLoginRes["user"]; onLogout?: () => void }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    message.success("Logged out successfully");
    onLogout?.();
    navigate("/");
  };

  return (
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
      <Space align="center" size="large">
        <Avatar size={64} icon={<UserOutlined />} />
        <div>
          <Title level={5} style={{ margin: 0 }}>
            {user.name}
          </Title>
          <Text type="secondary">{user.email}</Text>
        </div>
      </Space>

      <Divider style={{ margin: "12px 0" }} />

      <div>
        <Text strong>{t("role") || "Role"}: </Text>
        <Text>{user.role || t("customer")}</Text>
      </div>

      <Button
        type="primary"
        danger
        block
        size="large"
        icon={<LogoutOutlined />}
        style={{ marginTop: 12 }}
        onClick={handleLogout}
      >
        {t("logout") || "Logout"}
      </Button>
    </Space>
  );
}

export default InforPersonnalAccount;
