import { Button, Form, Modal, Radio, Table, Tag } from "antd";
import {
  useApproveOrderAdminMutation,
  useGetOrderAdminQuery,
} from "../../../store/services/OrderService";
import { Order, ProductOrderRes } from "../../../type/api";
import { FilePen } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const OrderAdminPage = () => {
  const { t } = useTranslation();
  const { data: orderList } = useGetOrderAdminQuery({});
  const [doApprove] = useApproveOrderAdminMutation();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | undefined>();

  // Cột chi tiết sản phẩm
  const expandColumns = [
    {
      title: t("image"),
      key: "image",
      render: (value: ProductOrderRes) => (
        <img className="w-24" src={value?.image} alt="" />
      ),
    },
    {
      title: t("product_name"),
      dataIndex: "product_name",
      key: "product_name",
      render: (value: string) => (
        <p className="text-base font-medium text-primary">{value}</p>
      ),
    },
    { title: t("color"), dataIndex: "color", key: "color" },
    { title: t("size"), dataIndex: "size", key: "size" },
    {
      title: t("price"),
      dataIndex: "price",
      key: "price",
      render: (value: string) => `${value}$`,
    },
  ];

  // Cột chính của bảng
  const columns = [
    {
      title: t("order_code"),
      dataIndex: "code",
      key: "code",
      render: (value: string) => <Tag color="success">{value}</Tag>,
    },
    {
      title: t("total_money"),
      key: "total_money",
      render: (_: string, record: Order) => {
        const total = record?.products?.reduce(
          (sum: number, p: ProductOrderRes) => sum + Number(p.price),
          0
        );
        return `${total}$`;
      },
    },
    {
      title: t("status"),
      dataIndex: "status",
      key: "status",
      render: (value: number) => <RenderStatusOrder value={value} t={t} />,
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
      render: (item: Order) => (
        <div className="flex gap-2">
          <Button onClick={() => openUpdateModal(item)}>
            <FilePen color="green" size={16} />
          </Button>
        </div>
      ),
    },
  ];

  const expandedRowRender = (record: Order) => (
    <Table
      columns={expandColumns}
      dataSource={record?.products}
      rowKey={(item) => item.product_id}
      pagination={false}
    />
  );

  // Modal update
  const openUpdateModal = (item: Order) => {
    setSelectedOrder(item);
    setIsUpdateModalOpen(true);
  };
  const handleApprove = (values: { status: number }) => {
    if (!selectedOrder) return;
    doApprove({ id: Number(selectedOrder._id), status: values.status })
      .unwrap()
      .then(() => {
        setIsUpdateModalOpen(false);
        setSelectedOrder(undefined);
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

      {/* Modal Cập nhật trạng thái */}
      <Modal
        title={t("update")}
        open={isUpdateModalOpen}
        onCancel={() => setIsUpdateModalOpen(false)}
        footer={null} // Ẩn nút mặc định
        centered
      >
        <Form
          layout="vertical"
          name="updateStatus"
          initialValues={{ status: 1 }}
          onFinish={handleApprove}
          autoComplete="off"
        >
          <Form.Item label={t("status")} name="status">
            <Radio.Group
              options={[
                { value: 1, label: t("canceled") },
                { value: 2, label: t("in_transit") },
                { value: 3, label: t("done") },
              ]}
            />
          </Form.Item>
          <div className="flex gap-2 justify-end">
            <Button onClick={() => setIsUpdateModalOpen(false)}>
              {t("cancel")}
            </Button>
            <Button type="primary" htmlType="submit">
              {t("confirm")}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default OrderAdminPage;

const RenderStatusOrder = ({
  value,
  t,
}: {
  value: number;
  t: (key: string) => string;
}) => {
  switch (value) {
    case 0:
      return <Tag>{t("unpaid")}</Tag>;
    case 1:
      return (
        <Tag icon={<CloseCircleOutlined />} color="error">
          {t("canceled")}
        </Tag>
      );
    case 2:
      return (
        <Tag icon={<SyncOutlined spin />} color="processing">
          {t("in_transit")}
        </Tag>
      );
    case 3:
      return (
        <Tag icon={<CheckCircleOutlined />} color="success">
          {t("done")}
        </Tag>
      );
    default:
      return null;
  }
};
