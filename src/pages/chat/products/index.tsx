import { Spin } from "antd";
import Header from "../../../components/Layout/Header";
import { useGetProductQuery } from "../../../store/services/ProductService";
import CardProduct from "../../../components/CardProduct";

export default function Products() {
  const { data: dataProduct, isLoading } = useGetProductQuery({});
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
      <div className="container mx-auto mt-24">
        <h2 className="text-4xl font-bold font-mono text-primary py-6 uppercase">
          ALL
        </h2>
        {isLoading ? (
          <Spin fullscreen={true} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 px-4">
            {dataProduct?.data?.map((item) => (
              <div className="px-2">
                <CardProduct product={item} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
