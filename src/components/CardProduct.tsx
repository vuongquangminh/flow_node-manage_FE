import { Rate } from "antd";
import { ShoppingCart } from "lucide-react";
import { ProductRes } from "../type/api";
import { useTranslation } from "react-i18next";
import { memo } from "react";
import { useNavigate } from "react-router-dom";

export default memo(function CardProduct({
  product,
}: {
  product?: ProductRes;
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="w-full overflow-hidden bg-white shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <div className="block overflow-hidden">
        <img
          className=" overflow-hidden  transition duration-500 ease-in-out transform hover:scale-105"
          src={product?.image || "./images/default-product.jpg"}
          alt="product image"
        />
      </div>
      <div className="px-5 pb-5">
        <div>
          <h5
            className=" cursor-pointer text-xl font-semibold tracking-tight text-gray-900 dark:text-white"
            onClick={() =>
              navigate(`/products/${product?._id}/${product?.name}`)
            }
          >
            {product?.name}
          </h5>
        </div>
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
          <a
            href="#"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <ShoppingCart size={32} />
          </a>
        </div>
      </div>
    </div>
  );
});
