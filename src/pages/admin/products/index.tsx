import { Button, Table, Tag } from "antd";
import {
  useDeleteProductMutation,
  useGetAllProductAdminQuery,
} from "../../../store/services/ProductService";
import { useTranslation } from "react-i18next";
import { ProductRes } from "../../../type/api";
import { FilePen, Trash } from "lucide-react";
import dayjs from "dayjs";
import { useNotice } from "../../../utils";
import ProductForm from "./ProductForm";
import { useState } from "react";
import ModelConfirm from "../../../components/ModelConfirm";

const ProductAdminPage = () => {
  const { t } = useTranslation();
  const { noticeError, contextHolder } = useNotice();
  const [isModal, setIsModal] = useState(false);
  const [doDelete] = useDeleteProductMutation();
  const [selectedProduct, setSelectedProduct] = useState<
    ProductRes | undefined
  >();
  const [modalDelete, setModalDelete] = useState(false);
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
            <Button
              onClick={() => {
                setSelectedProduct(item);
                setIsModal(true);
              }}
            >
              <FilePen color="green" size={16} />
            </Button>
            <Button
              onClick={() => {
                setModalDelete(true);
                setSelectedProduct(item);
              }}
            >
              <Trash color="red" size={16} />
            </Button>
          </>
        </div>
      ),
    },
  ];

  const handleDelete = (item: ProductRes) => {
    doDelete({ id: Number(item._id) })
      .unwrap()
      .then(() => setModalDelete(false));
  };

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
          item={selectedProduct}
          isModalOpen={isModal}
          handleCancel={() => setIsModal(false)}
        />
        <ModelConfirm
          title={t("delete")}
          content={
            <>
              {t("confirm_question")}
              <strong className="text-primary">
                {selectedProduct?.name}
              </strong>{" "}
              hay
              {t("yet")}
            </>
          }
          isOpen={modalDelete}
          onOk={() => handleDelete(selectedProduct as ProductRes)}
          onCancel={() => setModalDelete(false)}
        />
      </div>
    </>
  );
};

export default ProductAdminPage;
