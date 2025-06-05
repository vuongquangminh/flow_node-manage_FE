/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetUserQuery } from "../store/services/UserService";

import React from "react";
import { Space, Table } from "antd";
import type { TableProps } from "antd";
import { t } from "i18next";

interface DataType {
  email: string;
  name: string;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: t("username"),
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: t("email"),
    dataIndex: "email",
    key: "email",
  },

  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>{t("delete")}</a>
      </Space>
    ),
  },
];

const UserPage: React.FC = () => {
  const res: any = useGetUserQuery();
  return (
    <Table<DataType>
      columns={columns}
      dataSource={res.data}
      loading={res.isLoading}
    />
  );
};

export default UserPage;
