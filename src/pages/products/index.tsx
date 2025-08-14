import { Badge, Button, Progress, Spin } from "antd";
import Header from "../../components/Layout/Header";
import { useGetProductInfInfiniteQuery } from "../../store/services/ProductService";
import CardProduct from "../../components/CardProduct";
import { useEffect, useState } from "react";
import { ProductRes } from "../../type/api";
import { useTranslation } from "react-i18next";

export default function Products() {
  const {
    data: dataProduct,
    isFetching,
    fetchNextPage,
  } = useGetProductInfInfiniteQuery({});

  // Store products so old references are preserved
  const [products, setProducts] = useState<ProductRes[]>([]);
  const { t } = useTranslation();
  useEffect(() => {
    if (dataProduct?.pages) {
      // Flatten pages into one array
      const flatData = dataProduct.pages.map((page) => page.data).flat();

      // Append only truly new items
      setProducts((prev) => {
        const newItems = flatData.filter(
          (item): item is ProductRes =>
            item !== undefined && !prev.some((p) => p._id === item._id)
        );
        return [...prev, ...newItems];
      });
    }
  }, [dataProduct]);

  const onMore = async () => {
    await fetchNextPage();
  };

  const percent_progress =
    (products.length / Number(dataProduct?.pages?.[0]?.total || 1)) * 100;

  return (
    <>
      <div className=" items-center justify-items-center font-[family-name:var(--font-geist-sans)]">
        <Header />
        <p className="text-primary py-2">
          🎒Buy a backpack = get a free front pocket, code
          <strong>FREEGIFT</strong>
          <a href="/">– See terms</a>
        </p>
      </div>
      <div className="container mx-auto py-10">
        <Badge
          size="small"
          offset={[-5, 6]}
          count={dataProduct?.pages?.[0].total}
        >
          <div className="text-4xl font-bold font-mono text-primary px-6 pb-6 uppercase">
            {t("all")}
          </div>
        </Badge>
        {isFetching && products.length == 0 && <Spin fullscreen={true} />}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 px-4">
          {products.map((item) => (
            <div key={item._id} className="px-2">
              <CardProduct product={item} />
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <div className="text-center text-[#484885]">
            {`${products.length} products out of ${dataProduct?.pages?.[0].total}`}
            <Progress
              percent={percent_progress}
              strokeColor="#0000c8"
              showInfo={false}
            />
            <Button
              className={`mt-4 mr-4 text-primary rounded-none text-lg px-8 py-6 border-primary ${
                products.length < Number(dataProduct?.pages?.[0].total)
                  ? "hover:!bg-primary"
                  : ""
              }`}
              onClick={() => onMore()}
              disabled={
                products.length == Number(dataProduct?.pages?.[0].total)
              }
            >
              {t("see_more_product")}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
