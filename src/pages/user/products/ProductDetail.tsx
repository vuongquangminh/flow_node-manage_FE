import { useParams } from "react-router-dom";
import {
  useGetProductDetailQuery,
  useGetProductQuery,
} from "../../../store/services/ProductService";
import { Button, Col, notification, Row, Spin, Tooltip } from "antd";
import Header from "../../../components/Layout/Header";
import Slider from "react-slick";
import { ReactNode, useEffect, useRef, useState } from "react";
import {
  Award,
  EthernetPort,
  Factory,
  RulerDimensionLine,
  Sprout,
  Trophy,
  Weight,
} from "lucide-react";
import Composition from "./Composition";
import CardOurCategory from "../../../components/CardOurCategory";
import CardProduct from "../../../components/CardProduct";
import AnyQuestion from "./AnyQuestion";
import { our_mission, sub_our_mission } from "../homepage/HomePage";
import Footer from "../../../components/Layout/Footer";
import { useDispatch } from "react-redux";
import { addItemCart } from "../../../store/slices/cartSlice";
import { t } from "i18next";

export default function ProductDetail() {
  const { id } = useParams();
  const { data: dataProductDetail, isLoading } = useGetProductDetailQuery({
    id: String(id),
  });
  const { data: exploreProduct } = useGetProductQuery({
    type_bag: "bag_school",
  });

  const [imageSideBar, setImageSideBar] = useState<string[]>([]);
  const [sizeSelect, setSizeSelect] = useState("M");
  const [productColor, setProductColor] = useState<{
    id: number;
    name: string;
    image_color: string[];
  }>();
  const sliderRef = useRef<Slider>(null);
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();

  const preserve = [
    {
      id: 1,
      icon: <Trophy size={18} />,
      title: "Lifetime warranty",
    },
    {
      id: 2,
      icon: <Sprout size={18} />,
      title: "Lifetime warranty",
    },
    {
      id: 3,
      icon: <Factory size={18} />,
      title: "Lifetime warranty",
    },
  ];
  useEffect(() => {
    setProductColor(dataProductDetail?.data?.color[0]);
  }, [dataProductDetail]);
  const handleThumbnailClick = (index: number) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
    }
  };
  useEffect(() => {
    setImageSideBar(productColor?.image_color || []);
  }, [productColor]);

  const listSize = [
    {
      id: 1,
      label: "M",
      title: t("size_M"),
    },
    {
      id: 2,
      label: "L",
      title: t("size_L"),
    },
    {
      id: 3,
      label: "XL",
      title: t("size_XL"),
    },
  ];
  return (
    <>
      {contextHolder}
      <div className="bg-[#f4f9f8] items-center justify-items-center font-[family-name:var(--font-geist-sans)]">
        <Header />
        <p className="text-primary py-2">
          🎒Buy a backpack = get a free front pocket, code
          <strong>FREEGIFT</strong>
          <a href="/">– See terms</a>
        </p>
      </div>
      <div className="py-6">
        {isLoading ? (
          <Spin fullscreen={true} />
        ) : (
          <>
            <Row gutter={48} className="p-8 bg-[#f4f9f8] !mx-0 items-start">
              <Col sm={24} md={16}>
                <Row gutter={8} className="!mx-0">
                  <Col span={2}>
                    {imageSideBar.map((item, index) => (
                      <div
                        className="!flex justify-start"
                        key={index}
                        onClick={() => {
                          handleThumbnailClick(index);
                        }}
                      >
                        <img src={item} />
                      </div>
                    ))}
                  </Col>
                  <Col span={20}>
                    <Slider ref={sliderRef}>
                      {imageSideBar.map((item, index) => (
                        <div key={index} className="!flex justify-start ">
                          <img src={item} />
                        </div>
                      ))}
                    </Slider>
                  </Col>
                </Row>
              </Col>
              <Col sm={24} md={8} className="bg-white">
                <Button className="mt-4 text-primary rounded text-sm px-4 py-0 border-primary">
                  {t("new")}
                </Button>
                <div className="flex justify-between my-4">
                  <p className="text-primary text-2xl uppercase font-bold max-w-80 md:max-w-full">
                    {dataProductDetail?.data?.name}
                  </p>
                  <p className="text-gray-250 text-xl font-medium">
                    {dataProductDetail?.data?.price}$
                  </p>
                </div>
                <div className="py-4">
                  {t("color")}: <strong>{productColor?.name}</strong>
                </div>
                {listSize.map((item) => (
                  <Tooltip key={item.id} title={item.title}>
                    <Button
                      onClick={() => setSizeSelect(item.label)}
                      className={`mb-4 mx-2 ${
                        item.label == sizeSelect
                          ? "text-white bg-primary"
                          : "text-primary"
                      } rounded text-sm px-4 py-0 border-primary`}
                    >
                      {item.label}
                    </Button>
                  </Tooltip>
                ))}
                <div className="!flex justify-start gap-3 cursor-pointer">
                  {dataProductDetail?.data?.color.map((item) => (
                    <div
                      className=" w-20"
                      key={item.id}
                      onClick={() => {
                        setProductColor(item);
                      }}
                    >
                      <img src={String(item.image_color[0])} />
                    </div>
                  ))}
                </div>
                <Button
                  className="my-8 rounded-none w-full font-medium text-primary bg-yellow-300 hover:!bg-yellow-400 cursor-pointer text-lg px-8 py-6 border-primary"
                  onClick={() => {
                    dispatch(
                      addItemCart({
                        product_id: Number(id),
                        product_name: String(dataProductDetail?.data?.name),
                        image: String(productColor?.image_color[0]),
                        price: String(dataProductDetail?.data?.price),
                        size: sizeSelect,
                        color: String(productColor?.name),
                      })
                    );
                    api.success({
                      message: "Thành công!",
                      description: "Sản phẩm đã được thêm vào giỏ hàng",
                    });
                  }}
                >
                  {t("add")} - {dataProductDetail?.data?.price}$
                </Button>
                <div className="flex items-center text-sm bg-[#f4f9f8] py-2 px-2">
                  <Award size={24} color="#0da01e" />
                  <p>
                    Estimated delivery on <strong>Wednesday 13 August</strong> -
                    Free Returns
                  </p>
                </div>
                <div className="flex justify-around my-6 text-sky-700">
                  {preserve.map((item) => (
                    <div className="flex flex-col items-center">
                      {item.icon}
                      <p className="font-semibold pt-2">{item.title}</p>
                    </div>
                  ))}
                </div>
              </Col>
            </Row>
            <Row gutter={48} className="py-8 !mx-0">
              <Col sm={24} md={16}>
                <p className="text-primary text-2xl uppercase font-bold max-w-80 md:max-w-full">
                  {dataProductDetail?.data?.title}
                </p>
                <RenderInforWeight
                  icon={<RulerDimensionLine size={24} color="#0000c8" />}
                  name="Dimensions"
                  value={dataProductDetail?.data?.dimensions}
                />
                <RenderInforWeight
                  icon={<Weight size={24} color="#0000c8" />}
                  name="Weight"
                  value={dataProductDetail?.data?.weight}
                />
                <RenderInforWeight
                  icon={<EthernetPort size={24} color="#0000c8" />}
                  name="Integrated straps"
                  value={dataProductDetail?.data?.weight}
                />
                {dataProductDetail?.data?.feature.map((item) => (
                  <li>{item}</li>
                ))}
                <Composition
                  button="Composition and maintenance"
                  item={dataProductDetail?.data?.composition_maintenance}
                />
                <Composition
                  button="Sustainability and guarantee"
                  item={dataProductDetail?.data?.composition_maintenance}
                />
              </Col>
              <Col sm={24} md={8}>
                <CardOurCategory
                  item={{
                    id: Number(productColor?.id),
                    image: String(
                      productColor?.image_color[
                        productColor?.image_color.length - 1
                      ]
                    ),
                  }}
                />
              </Col>
            </Row>
            <div className="p-8">
              <p className="text-primary text-2xl uppercase font-bold max-w-80 md:max-w-full">
                {t("explore")}
              </p>
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                {exploreProduct?.data?.map((product) => (
                  <Col className="gutter-row" xs={24} sm={12} md={8} lg={6}>
                    <div className="px-2">
                      <CardProduct product={product} />
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
            <AnyQuestion />
            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {our_mission.map((item) => (
                <CardOurCategory key={item.id} item={item} />
              ))}
            </div>
            <div className="container mx-auto py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {sub_our_mission.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start text-[#504584] gap-2 opacity-7"
                >
                  <div>{item.icon}</div>
                  <div>
                    <div className="font-bold">{item.title}</div>
                    <div className="text-xs">{item.description}</div>
                  </div>
                </div>
              ))}
            </div>
            <Footer />
          </>
        )}
      </div>
    </>
  );
}

const RenderInforWeight = ({
  icon,
  name,
  value,
}: {
  icon: ReactNode;
  name: string;
  value?: string;
}) => {
  return (
    <div className="flex items-center gap-2 py-2">
      {icon}
      <strong>{name} : </strong>
      {value}
    </div>
  );
};
