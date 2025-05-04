import React, { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { useGetListFriendQuery } from "../../store/services/FriendService";
import { getLocalStorage } from "../../hooks/localStorage";
import { useGetUserQuery } from "../../store/services/UserService";

const SideBar: React.FC = () => {
  const navigate = useNavigate();
  const res = useGetListFriendQuery();
  const user = getLocalStorage({ key: "user" });
  const account = useGetUserQuery();
  const [selectedKey, setSelectedKey] = useState("1");

  const items = res.data?.map((item) => ({
    key: String(user._id == item.id_user_1 ? item.id_user_2 : item.id_user_1),
    icon: <UserOutlined />,
    label: user._id == item.id_user_1 ? item.name_user_2 : item.name_user_1,
  }));
  const options = res?.data?.map((item) => ({
    value: user._id == item.id_user_1 ? item.id_user_2 : item.id_user_1,
    label: user._id == item.id_user_1 ? item.name_user_2 : item.name_user_1,
  }));

  const handleClick: MenuProps["onClick"] = (e) => {
    const clickedItem = items?.find((item) => item.key === e.key);
    if (clickedItem) {
      navigate(`/conversation/${clickedItem.key}/${clickedItem.label}`);
    }
  };

  useEffect(() => {
    res.refetch();
  }, []);

  const handleChange = (
    value: string,
    option: { value: number; label: string }
  ) => {
    navigate(`/conversation/${value}/${option.label}`);
    setSelectedKey(String(value));
  };
  return (
    <div>
      <Select
        className="w-full"
        showSearch
        allowClear
        placeholder="Select a person"
        optionFilterProp="label"
        onChange={handleChange}
        options={options}
      />
      {items?.length > 0 ? (
        <Menu
          defaultSelectedKeys={[selectedKey]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="dark"
          items={items}
          onClick={handleClick}
          key={selectedKey}
        />
      ) : (
        "Bạn chưa có bạn bè nào"
      )}
    </div>
  );
};

export default SideBar;
