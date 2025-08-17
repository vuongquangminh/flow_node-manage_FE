import { Button, Table, Tag } from "antd";
import { useGetAllProductAdminQuery } from "../../../store/services/ProductService";
import { useTranslation } from "react-i18next";
import { ProductRes } from "../../../type/api";
import { FilePen, Trash } from "lucide-react";
import dayjs from "dayjs";
import { useNotice } from "../../../utils";

const ProductAdminPage = () => {
  const { t } = useTranslation();
  const { noticeError, contextHolder } = useNotice();

  const { data: dataProduct } = useGetAllProductAdminQuery({
    onError: () => {
      noticeError(t("expired"));
    },
  });
  const columns = [
    {
      title: t("image"),
      key: "image",
      render: (value: ProductRes) => {
        return <img className="w-24" src={value?.image} alt="" />;
      },
    },
    {
      title: t("product_name"),
      dataIndex: "name",
      key: "name",
      render: (value: string) => <Tag color="success">{value}</Tag>,
    },
    {
      title: t("price"),
      dataIndex: "price",
      key: "price",
      render: (value: string) => {
        return `${value}$`;
      },
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
      render: (item: ProductRes) => (
        <div className="flex gap-2">
          <>
            <Button onClick={() => handleUpdate(item)}>
              <FilePen color="green" size={16} />
            </Button>
            <Button onClick={() => handleDelete(item)}>
              <Trash color="red" size={16} />
            </Button>
          </>
        </div>
      ),
    },
  ];

  const handleUpdate = (item: ProductRes) => {
    console.log("item: ", item);
  };
  const handleDelete = (item: ProductRes) => {
    console.log("item: ", item);
  };
  console.log("dataProduct: ", dataProduct);
  return (
    <>
      {contextHolder}
      <div className="py-6">
        <div className="text-end pb-4">
          <Button type="primary">{t("add")}</Button>
        </div>
        <Table
          columns={columns}
          dataSource={Array.isArray(dataProduct?.data) ? dataProduct?.data : []}
        />
      </div>
    </>
  );
};

export default ProductAdminPage;
