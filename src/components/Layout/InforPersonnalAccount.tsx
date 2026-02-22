import { Avatar, Button, Divider, Space, Typography } from "antd";
import { TLoginRes } from "../../store/services/UserService"
import { UserOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const { Title, Text } = Typography;
function InforPersonnalAccount({user}: {user: TLoginRes["user"]}) {
      const { t } = useTranslation();
    
    const handleChangeAccount = () => {
        console.log("Change account clicked");
        // navigate("/switch-account") or open modal
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
          <Text strong>Role: </Text>
          <Text>{user.role || t('customer')}</Text>
        </div>

        <Button
          type="primary"
          block
          size="large"
          style={{ marginTop: 12 }}
          onClick={handleChangeAccount}
        >
          Change Account
        </Button>
      </Space>
  )
}

export default InforPersonnalAccount