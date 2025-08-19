import { Button, Table, Tag } from "antd";
import { useGetAllProductAdminQuery } from "../../../store/services/ProductService";
import { useTranslation } from "react-i18next";
import { ProductRes } from "../../../type/api";
import { FilePen, Trash } from "lucide-react";
import dayjs from "dayjs";
import { useNotice } from "../../../utils";
import ProductForm from "./ProductForm";
import { useState } from "react";

const ProductAdminPage = () => {
  const { t } = useTranslation();
  const { noticeError, contextHolder } = useNotice();
  const [isModal, setIsModal] = useState(false);
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
  const handleAdd = () => {};
  console.log("dataProduct: ", dataProduct);
  return (
    <>
      {contextHolder}
      <div className="py-6">
        <div className="flex items-center justify-between pb-4">
          <p className="text-xl font-bold ">
            {t("featur_manage", { name: "product" })}
          </p>
          <div className="">
            <Button type="primary" onClick={() => setIsModal(true)}>
              {t("add")}
            </Button>
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={Array.isArray(dataProduct?.data) ? dataProduct?.data : []}
        />
        <ProductForm
          isModalOpen={isModal}
          handleOk={() => handleAdd}
          handleCancel={() => setIsModal(false)}
        />
      </div>
    </>
  );
};

export default ProductAdminPage;
