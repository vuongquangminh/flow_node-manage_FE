import React, { useState } from "react";
import { Button, Table } from "antd";
import type { TableProps } from "antd";
import { t } from "i18next";
import {
  useDeleteUserMutation,
  useGetUserQuery,
} from "../../../store/services/UserService";
import { Trash } from "lucide-react";
import { useNotice } from "../../../utils";
import { UserRes } from "../../../type/api";
import ModelConfirm from "../../../components/ModelConfirm";
interface DataType {
  email: string;
  name: string;
}

const AccountAdminPage: React.FC = () => {
  const res = useGetUserQuery();
  const [doDelete] = useDeleteUserMutation();
  const { noticeSuccess, contextHolder } = useNotice();
  const [selectedUser, setSelectedUser] = useState<UserRes | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = (item: UserRes) => {
    setSelectedUser(item);
    setIsModalOpen(true);
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: t("name"),
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
      title: t("action"),
      key: "action",
      render: (_, record) => (
        <Button onClick={() => handleDelete(record as UserRes)}>
          <Trash color="red" size={16} />
        </Button>
      ),
    },
  ];
  const handleOk = () => {
    doDelete({ id: Number(selectedUser?._id) })
      .unwrap()
      .then(() => {
        setSelectedUser(undefined);
        setIsModalOpen(false);
        noticeSuccess(t("delete"));
      });
  };

  return (
    <>
      {contextHolder}
      <div className="text-end pb-4">
        <Button type="primary">{t("add")}</Button>
      </div>
      <Table<DataType>
        rowKey="email"
        columns={columns}
        dataSource={res.data}
        loading={res.isLoading}
      />
      <ModelConfirm
        title={t("delete")}
        content={
          <>
            {t("confirm_question")}
            <strong className="text-primary">{selectedUser?.email}</strong> hay
            {t("yet")}
          </>
        }
        isOpen={isModalOpen}
        onOk={() => handleOk()}
        onCancel={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default AccountAdminPage;
