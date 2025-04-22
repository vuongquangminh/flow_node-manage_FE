import { useGetUserQuery } from "../store/services/UserService";

import React from "react";
import { Space, Table } from "antd";
import type { TableProps } from "antd";

interface DataType {
  email: string;
  name: string;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },

  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const UserPage: React.FC = () => {
  const res = useGetUserQuery();
  return (
    <Table<DataType>
      columns={columns}
      dataSource={res.data}
      loading={res.isLoading}
    />
  );
};

export default UserPage;
