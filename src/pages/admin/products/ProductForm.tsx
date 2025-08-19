import {
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  Modal,
  Space,
} from "antd";
import { ProductReq, ProductRes } from "../../../type/api";
import { useTranslation } from "react-i18next";
import { CloseOutlined } from "@ant-design/icons";
import {
  useAddProductMutation,
  useUpdateProductMutation,
} from "../../../store/services/ProductService";
import {
  composition_maintenance,
  sustainability_guarantee,
} from "../../../constants";
import { useNotice } from "../../../utils";

export default function ProductForm({
  item,
  isModalOpen,
  handleCancel,
}: {
  item?: ProductRes;
  isModalOpen: boolean;
  handleCancel: () => void;
}) {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [doAdd, { isLoading: loadingAdd }] = useAddProductMutation();
  const [doUpdate, { isLoading: loadingUpdate }] = useUpdateProductMutation();
  const { noticeSuccess, contextHolder } = useNotice();
  const handleAdd = (values: ProductReq) => {
    const newData = {
      ...values,
      composition_maintenance: composition_maintenance,
      sustainability_guarantee: sustainability_guarantee,
    };
    if (item) {
      doUpdate({ ...newData, id: item._id })
        .unwrap()
        .then(() => {
          noticeSuccess(t("add_success", { name: t("product") }));
        });
    } else {
      doAdd({ ...newData })
        .unwrap()
        .then(() => {
          noticeSuccess(t("add_success", { name: t("product") }));
        });
    }
  };
  return (
    <>
      {contextHolder}
      <Modal
        title="Basic Modal"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={<></>}
        width={1000}
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          form={form}
          onFinish={handleAdd}
          initialValues={item}
          className="max-h-[500px] overflow-y-scroll"
        >
          <Form.Item label={t("product_name")} name="name">
            <Input placeholder={t("product_name")} />
          </Form.Item>
          <Form.Item label={t("image")} name="image">
            <Input placeholder={t("image")} />
          </Form.Item>
          <Form.Item label={t("price")} name="price">
            <Input placeholder={t("price")} />
          </Form.Item>
          <Form.Item label={t("type_bag")} name="type_bag">
            <Input placeholder={t("type_bag")} />
          </Form.Item>
          <Form.Item label={t("size")} name="size">
            <Checkbox.Group
              options={["Small", "Medium", "Large"]}
              defaultValue={["Small"]}
            />
          </Form.Item>
          <Form.Item label={t("title")} name="title">
            <Input placeholder={t("title")} />
          </Form.Item>
          <Form.Item label={t("dimensions")} name="dimensions">
            <Input placeholder={t("dimensions")} />
          </Form.Item>
          <Form.Item label={t("weight")} name="weight">
            <Input placeholder={t("weight")} />
          </Form.Item>
          <Form.List name="color">
            {(fields, { add, remove }) => {
              return (
                <div className="flex flex-col gap-4">
                  {fields.map((field) => (
                    <Card
                      size="small"
                      title={`Color ${field.name + 1}`}
                      key={field.key}
                      extra={
                        <CloseOutlined
                          onClick={() => {
                            remove(field.name);
                          }}
                        />
                      }
                    >
                      <Form.Item name={[field.name, "id"]} hidden>
                        <Input />
                      </Form.Item>
                      <Form.Item label="Name" name={[field.name, "name"]}>
                        <Input />
                      </Form.Item>

                      <Form.Item label="Image Color">
                        <Form.List name={[field.name, "image_color"]}>
                          {(subFields, subOpt) => (
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                rowGap: 16,
                              }}
                            >
                              {subFields.map((subField) => (
                                <Space key={subField.key} align="baseline">
                                  <Form.Item
                                    noStyle
                                    name={subField.name}
                                    className="w-full"
                                  >
                                    <Input
                                      className="w-full"
                                      placeholder="image_color"
                                    />
                                  </Form.Item>

                                  <CloseOutlined
                                    onClick={() => subOpt.remove(subField.name)}
                                  />
                                </Space>
                              ))}
                              <Button
                                type="dashed"
                                onClick={() => subOpt.add("")} // <-- add string rỗng thay vì object
                                block
                              >
                                + {t("add_image_color")}
                              </Button>
                            </div>
                          )}
                        </Form.List>
                      </Form.Item>
                    </Card>
                  ))}

                  <Button
                    type="dashed"
                    onClick={() =>
                      add({
                        id: fields.length + 1,
                        name: "",
                        image_color: [],
                      })
                    }
                    block
                  >
                    + {t("add_product_color")}
                  </Button>
                </div>
              );
            }}
          </Form.List>
        </Form>
        <div className="flex justify-end py-2">
          <Button
            type="primary"
            htmlType="submit"
            loading={loadingAdd || loadingUpdate}
          >
            {t("submit")}
          </Button>
        </div>
      </Modal>
    </>
  );
}
