import React from "react";
import { DesktopOutlined, PieChartOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number] & { path: string };

const items: MenuItem[] = [
  { key: "1", icon: <PieChartOutlined />, label: "User", path: "/user" },
  { key: "2", icon: <DesktopOutlined />, label: "Flow", path: "/flow" },
  //   {
  //     key: "sub1",
  //     label: "Navigation One",
  //     icon: <MailOutlined />,
  //     children: [
  //       { key: "5", label: "Option 5" },
  //       { key: "6", label: "Option 6" },
  //       { key: "7", label: "Option 7" },
  //       { key: "8", label: "Option 8" },
  //     ],
  //   },
];

const SideBar: React.FC = () => {
  const navigate = useNavigate();

  const handleClick: MenuProps["onClick"] = (e) => {
    const clickedItem = items.find((item) => item.key === e.key);
    if (clickedItem && "path" in clickedItem) {
      navigate(clickedItem.path);
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
