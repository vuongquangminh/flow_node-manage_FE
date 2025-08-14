import { Button, Table, Tag } from "antd";
import { useGetOrderQuery } from "../../store/services/OrderService";
import { getLocalStorage } from "../../hooks/localStorage";
import { Order, ProductOrderRes } from "../../type/api";
import { Trash } from "lucide-react";
import { useState } from "react";
import ModelConfirm from "../../components/ModelConfirm";
import { useTranslation } from "react-i18next";

const OrderPage = () => {
  const { t } = useTranslation();
  const user = getLocalStorage({ key: "user" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: orderList } = useGetOrderQuery({ user_id: user._id });
  const [selectedOrder, setSelectedOrder] = useState<Order | undefined>();
  const expandColumns = [
    {
      title: t("image"),
      key: "image",
      render: (value: ProductOrderRes) => {
        return <img className="w-24" src={value?.image} alt="" />;
      },
    },
    {
      title: t("product_name"),
      dataIndex: "product_name",
      key: "product_name",
      render: (value: string) => {
        return <p className="text-base font-medium text-primary">{value}</p>;
      },
    },
    { title: t("color"), dataIndex: "color", key: "color" },
    { title: t("size"), dataIndex: "size", key: "size" },
    {
      title: t("price"),
      dataIndex: "price",
      key: "price",
    },
  ];

  const columns = [
    {
      title: t("order_code"),
      dataIndex: "code",
      key: "code",
      render: (value: string) => {
        return <Tag color="success">{value}</Tag>;
      },
    },
    {
      title: t("total_money"),
      key: "total_money",
      render: (_value: string, record: Order) => {
        const total = record?.products?.reduce(
          (accumulator: number, currentValue: ProductOrderRes) => {
            return accumulator + Number(currentValue.price);
            // return '123'
          },
          0
        );
        return total;
      },
    },
    { title: t("created_at"), dataIndex: "createdAt", key: "createdAt" },
    {
      title: t("action"),
      key: "action",
      render: (item: Order) => {
        return (
          <Button onClick={() => handleDelete(item)}>
            <Trash color="red" size={16} />
          </Button>
        );
      },
    },
  ];

  const expandedRowRender = (record: Order) => (
    <Table
      columns={expandColumns}
      dataSource={record?.products} // lấy products của order này
      rowKey={(item) => item.product_id} // nếu có _id
      pagination={false}
    />
  );

  const handleDelete = (item: Order) => {
    console.log(item);
    setSelectedOrder(item);
    setIsModalOpen(true);
  };

  return (
    <>
      <Table
        columns={columns}
        expandable={{ expandedRowRender }}
        rowKey={(record) => record.code}
        dataSource={Array.isArray(orderList?.data) ? orderList.data : []}
      />
      <ModelConfirm
        title={t("delete")}
        content={
          <>
            {t("confirm_question")}
            <strong className="text-primary">{selectedOrder?.code}</strong> hay
            {t("yet")}
          </>
        }
        isOpen={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default OrderPage;
