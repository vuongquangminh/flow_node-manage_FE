import {
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  Modal,
  Space,
  Typography,
} from "antd";
import { ProductRes } from "../../../type/api";
import { useTranslation } from "react-i18next";
import { CloseOutlined } from "@ant-design/icons";

export default function ProductForm({
  item,
  isModalOpen,
  handleOk,
  handleCancel,
}: {
  item?: ProductRes;
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}) {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  return (
    <Modal
      title="Basic Modal"
      closable={{ "aria-label": "Custom Close Button" }}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={<></>}
      width={1000}
    >
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        form={form}
        initialValues={{ name: item?.name }}
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
            console.log("field: ", fields);
            return (
              <div
                style={{ display: "flex", rowGap: 16, flexDirection: "column" }}
              >
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

                    {/* Nest Form.List */}
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
                                  name={subField.name} // <-- chỉ name trực tiếp
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
                              + Thêm ảnh màu
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
                  + Thêm màu sản phẩm
                </Button>
              </div>
            );
          }}
        </Form.List>

        <Form.Item noStyle shouldUpdate>
          {() => (
            <Typography>
              <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
            </Typography>
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
}
