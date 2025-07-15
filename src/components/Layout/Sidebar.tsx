import React, { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { useGetListFriendQuery } from "../../store/services/FriendService";
import { getLocalStorage } from "../../hooks/localStorage";
import { useTranslation } from "react-i18next";

const SideBar: React.FC = () => {
  const navigate = useNavigate();
  const res = useGetListFriendQuery();
  const user = getLocalStorage({ key: "user" });
  const [selectedKey, setSelectedKey] = useState("1");
  const { t } = useTranslation();

  const items = (Array.isArray(res.data) ? res.data : []).map((item) => ({
    key: String(user._id == item.id_user_1 ? item.id_user_2 : item.id_user_1),
    icon: <UserOutlined />,
    label: user._id == item.id_user_1 ? item.name_user_2 : item.name_user_1,
  }));
  const options = (Array.isArray(res.data) ? res.data : []).map((item) => ({
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
        placeholder={t('select_friend_chat')}
        optionFilterProp="label"
        onChange={() => handleChange}
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
        t('none_friends')
      )}
    </div>
  );
};

export default SideBar;
