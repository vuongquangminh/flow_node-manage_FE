import { Button, Spin } from "antd";
import SlickImage from "../../../components/SlickImage";
import { useGetProductQuery } from "../../../store/services/ProductService";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import { slick_settings_banner } from "../../../constants";
import OurUnivers from "./OurUnivers";
import CardOurCategory from "../../../components/CardOurCategory";
import { Container, CreditCard, Mail, RefreshCcw } from "lucide-react";
import MostProminent from "./MostProminent";
import { t } from "i18next";

export default function Homepage() {
  const res = useGetProductQuery({});
  const { t } = useTranslation();

  return (
    <>
      {res.isLoading ? (
        <Spin fullscreen />
      ) : (
        <>
          <div className="relative overflow-hidden">
            <Slider {...slick_settings_banner} className="w-full">
              <div>
                <img src="./images/banner1.webp" alt="" />
              </div>
              <div>
                <img src="./images/banner2.webp" alt="" />
              </div>
              <div>
                <img src="./images/banner3.webp" alt="" />
              </div>
            </Slider>

            <div className="absolute hidden sm:block p-8 md:pl-16 top-3/4 transform -translate-y-3/4 max-w-[800px] text-white">
              <h2 className="text-sm sm:text-4xl md:text-6xl font-bold font-fantasy">
                {t("cross_body")}
              </h2>
              <p className="mt-4 max-w-xl">{t("description_banner")}</p>
              <Button className="mt-4 mr-4 text-primary rounded-none text-lg px-8 py-6 border-primary">
                {t("discover")}
              </Button>
              <Button className="mt-4 text-primary rounded-none text-lg px-8 py-6 border-primary">
                {t("know_more")}
              </Button>
            </div>
          </div>

          <div className="m-4">
            <h2 className="text-4xl font-bold font-mono text-primary py-6 uppercase">
              {t("our_recommandations")}
            </h2>
            <SlickImage products={res?.data?.data} />
          </div>
          <div className="m-4">
            <h2 className="text-4xl font-bold font-mono text-primary py-6 uppercase">
              {t("our_univers")}
            </h2>
            <OurUnivers />
          </div>
          <div className="relative overflow-hidden my-12">
            <div className="aspect-[4/5] sm:aspect-[5/3] md:aspect-[8/3]">
              <img
                className="w-full h-full object-cover object-center"
                src="./images/our-mission.webp"
                alt=""
              />
            </div>

            <div className="absolute p-8 md:pl-16 top-3/4 transform -translate-y-3/4 max-w-[800px] text-white">
              <h2 className=" text-4xl sm:text-4xl md:text-6xl font-bold font-fantasy">
                {t("our_mission")}
              </h2>
              <p className="mt-4 max-w-xl">{t("sub_mission")}</p>

              <Button className="mt-4 text-primary rounded-none text-lg px-8 py-6 border-primary">
                {t("read_more")}
              </Button>
            </div>
          </div>
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
          <div className="container mx-auto py-6">
            <MostProminent />
          </div>
        </>
      )}
    </>
  );
}
export const sub_our_mission = [
  {
    id: 1,
    icon: <CreditCard size={24} />,
    title: "100% secure",
    description: "Secure payment methods",
  },
  {
    id: 2,
    icon: <Container size={24} />,
    title: "Lifetime guarantee",
    description: "on bags and luggage",
  },
  {
    id: 3,
    icon: <RefreshCcw size={24} />,
    title: "Free Returns",
    description: "check conditions",
  },
  {
    id: 4,
    icon: <Mail size={24} />,
    title: "Customer support",
    description: "Monday to Friday from 10 am to 6:30 pm",
  },
];
export const our_mission = [
  {
    id: 1,
    image: "/images/our-mission-1.webp",
    title: t("partner_organization"),
  },
  {
    id: 2,
    image: "/images/our-mission-2.webp",
    title: t("we_are_Bcorp"),
  },
  {
    id: 3,
    image: "/images/our-mission-3.webp",
    title: t("know_how"),
  },
];
