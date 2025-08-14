import { Button, Table, Tag } from "antd";
import {
  useDeleteOrderMutation,
  useGetOrderQuery,
} from "../../../store/services/OrderService";
import { getLocalStorage } from "../../../hooks/localStorage";
import { Order, ProductOrderRes } from "../../../type/api";
import { HandCoins, Trash } from "lucide-react";
import { useState } from "react";
import ModelConfirm from "../../../components/ModelConfirm";
import { useTranslation } from "react-i18next";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { t } from "i18next";

const OrderPage = () => {
  const { t } = useTranslation();
  const user = getLocalStorage({ key: "user" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: orderList } = useGetOrderQuery({ user_id: user._id });
  const [selectedOrder, setSelectedOrder] = useState<Order | undefined>();
  const [doDelete] = useDeleteOrderMutation();
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
      render: (value: string) => {
        return `${value}$`;
      },
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
          },
          0
        );
        return total + "$";
      },
    },
    {
      title: t("status"),
      dataIndex: "status",
      key: "status",
      render: (value: number) => <RenderStatusOrder value={value} />,
    },
    {
      title: t("created_at"),
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value: string) => dayjs(value).format("DD/MM/YYYY"),
    },
    {
      title: t("action"),
      key: "action",
      render: (item: Order) => {
        return (
          <div className="flex gap-2">
            <Button onClick={() => setIsModalOpen(true)}>
              <HandCoins color="green" size={16} />
            </Button>
            <Button onClick={() => handleDelete(item)}>
              <Trash color="red" size={16} />
            </Button>
          </div>
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

  const handleOk = () => {
    doDelete({ id: Number(selectedOrder?._id) })
      .unwrap()
      .then(() => {
        setSelectedOrder(undefined);
        setIsModalOpen(false);
      });
  };

  return (
    <div className="py-6">
      <Table
        columns={columns}
        expandable={{ expandedRowRender }}
        rowKey={(record) => record.code}
        dataSource={Array.isArray(orderList?.data) ? orderList.data : []}
      />
      <ModelConfirm
        title={selectedOrder ? t("delete") : t("qr")}
        content={
          <>
            {selectedOrder ? (
              <>
                {t("confirm_question")}
                <strong className="text-primary">
                  {selectedOrder?.code}
                </strong>{" "}
                hay
                {t("yet")}
              </>
            ) : (
              <>
                <img
                  src={`https://qr.sepay.vn/img?bank=Techcombank&acc=19036382538019&template=compact&amount=100000&des=thanh+toan+don+hang`}
                />
              </>
            )}
          </>
        }
        isOpen={isModalOpen}
        onOk={() => handleOk()}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default OrderPage;

const RenderStatusOrder = ({ value }: { value: number }) => {
  if (value == 0) {
    return <Tag>{t("unpaid")}</Tag>;
  } else if (value == 1) {
    return (
      <Tag icon={<CloseCircleOutlined />} color="error">
        {t("canceled")}
      </Tag>
    );
  } else if (value == 2) {
    return (
      <Tag icon={<SyncOutlined spin />} color="processing">
        {t("in_transit")}
      </Tag>
    );
  } else if (value == 3) {
    return (
      <Tag icon={<CheckCircleOutlined />} color="success">
        {t("done")}
      </Tag>
    );
  }
};
