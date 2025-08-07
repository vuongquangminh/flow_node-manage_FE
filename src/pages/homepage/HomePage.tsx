import { Button } from "antd";
import Header from "../../components/Layout/Header";
import SlickImage from "../../components/SlickImage";
import { useGetProductQuery } from "../../store/services/ProductService";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import { slick_settings_banner } from "../../constants";
import OurUnivers from "./OurUnivers";

export default function Homepage() {
  const res = useGetProductQuery({});
  const { t } = useTranslation();
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

        <div className="absolute p-8 md:pl-16 top-3/4 transform -translate-y-3/4 max-w-[800px] text-white">
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
        <SlickImage products={res?.data} />
      </div>
      <div className="m-4">
        <h2 className="text-4xl font-bold font-mono text-primary py-6 uppercase">
          {t("our_univers")}
        </h2>
        <OurUnivers />
      </div>
    </>
  );
}
