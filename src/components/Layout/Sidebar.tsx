import React from "react";
import { UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { useGetUserQuery } from "../../store/services/UserService";

const SideBar: React.FC = () => {
  const navigate = useNavigate();
  const res = useGetUserQuery();

  const items = res.data?.map((item) => ({
    key: String(item._id),
    icon: <UserOutlined />,
    label: item.name,
  }));

  const handleClick: MenuProps["onClick"] = (e) => {
    const clickedItem = items?.find((item) => item.key === e.key);
    if (clickedItem && "path" in clickedItem) {
      navigate(`/${clickedItem.key}`);
    }
  };

  return (
    <div>
      <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="dark"
        items={items}
        onClick={handleClick}
      />
    </div>
  );
};

export default SideBar;
