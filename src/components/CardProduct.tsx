import { notification, Popover, Rate } from "antd";
import { ShoppingCart } from "lucide-react";
import { ProductRes } from "../type/api";
import { useTranslation } from "react-i18next";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItemCart } from "../store/slices/cartSlice";

export default memo(function CardProduct({
  product,
}: {
  product?: ProductRes;
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();

  return (
    <>
      {contextHolder}
      <div className="w-full h-full overflow-hidden bg-white shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="block overflow-hidden">
          <img
            className=" overflow-hidden bg-[#f3faf8]  transition duration-500 ease-in-out transform hover:scale-105"
            src={product?.image || "./images/default-product.jpg"}
            alt="product image"
          />
        </div>
        <div className="px-5 pb-5">
          <Popover title={product?.name}>
            <h5
              className="cursor-pointer text-xl font-semibold  tracking-tight text-gray-900 dark:text-white truncate max-w-full"
              onClick={() =>
                navigate(`/products/${product?._id}/${product?.name}`)
              }
            >
              {product?.name}
            </h5>
          </Popover>
          <div className="flex items-center mt-2.5 mb-5">
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              <Rate allowHalf defaultValue={Number(product?.rate) || 5} />
            </div>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">
              {t("sold")}
              {": "}
              {product?.sold}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              {product?.price}$
            </span>
            <button
              className="text-white bg-red-400 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-3 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => {
                dispatch(
                  addItemCart({
                    product_id: Number(product?._id),
                    product_name: String(product?.name),
                    image: String(product?.color[0]?.image_color[0]),
                    price: String(product?.price),
                    size: String(product?.size[0]),
                    color: String(product?.color?.[0].name),
                  })
                );
                api.success({
                  message: t("success"),
                  description: t("add_cart_success"),
                });
              }}
            >
              <ShoppingCart size={24} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
});
