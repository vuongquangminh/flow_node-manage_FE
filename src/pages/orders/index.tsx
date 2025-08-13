import { Button, Table, Tag } from "antd";
import { useGetOrderQuery } from "../../store/services/OrderService";
import { getLocalStorage } from "../../hooks/localStorage";
import { Order, OrderRes, ProductOrderRes } from "../../type/api";
import { Trash } from "lucide-react";

const OrderPage = () => {
  const user = getLocalStorage({ key: "user" });

  const { data: orderList } = useGetOrderQuery({ user_id: user._id });

  const expandColumns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "product_name",
      key: "product_name",
    },
    { title: "Màu sắc", dataIndex: "color", key: "color" },
    { title: "size", dataIndex: "size", key: "size" },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },
  ];

  const handleDelete = (item: OrderRes) => {
    console.log("item: ", item);
    return "123";
  };
  const columns = [
    {
      title: "Mã đơn hàng ",
      dataIndex: "code",
      key: "code",
      render: (value: string) => {
        return <Tag color="success">{value}</Tag>;
      },
    },
    {
      title: "Tổng tiền",
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
    { title: "Ngày tạo", dataIndex: "createdAt", key: "createdAt" },
    {
      title: "Hành động",
      key: "action",
      render: (item: OrderRes) => {
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
  return (
    <>
      <Table
        columns={columns}
        expandable={{ expandedRowRender }}
        rowKey={(record) => record.code}
        dataSource={Array.isArray(orderList?.data) ? orderList.data : []}
      />
    </>
  );
};

export default OrderPage;
