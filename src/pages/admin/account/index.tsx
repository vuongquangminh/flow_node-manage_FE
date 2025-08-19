import React, { useState } from "react";
import { Button, Table } from "antd";
import type { TableProps } from "antd";
import {
  useDeleteUserMutation,
  useGetUserAdminQuery,
} from "../../../store/services/UserService";
import { Trash } from "lucide-react";
import { useNotice } from "../../../utils";
import { UserRes } from "../../../type/api";
import ModelConfirm from "../../../components/ModelConfirm";
import { useTranslation } from "react-i18next";
interface DataType {
  email: string;
  name: string;
}

const AccountAdminPage: React.FC = () => {
  const { noticeSuccess, noticeError, contextHolder } = useNotice();
  const { t } = useTranslation();

  const res = useGetUserAdminQuery({
    onError: () => {
      noticeError(t("expired"));
    },
  });
  const [doDelete] = useDeleteUserMutation();
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
      <div className="flex items-center justify-between pb-4">
        <p className="text-xl font-bold ">
          {t("featur_manage", { name: "account" })}
        </p>
        <div className="">
          <Button type="primary">{t("add")}</Button>
        </div>
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
