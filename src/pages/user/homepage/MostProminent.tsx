import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function MostProminent() {
  const [isMobile, setIsMobile] = useState(false);
  const { t } = useTranslation();
  useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth <= 650);

    checkWidth(); // Gọi lần đầu

    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);
  return (
    <div className="container mx-auto py-4 sm:py-20">
      <Row gutter={32} className="px-4 sm:px-16 md:px-0 !mx-0">
        <Col span={24} md={16} className="px-20">
          <div className="md:pr-30">
            <div className="">
              <p className="uppercase tracking-[3px] text-sm text-[#504584]">
                {t("bage")}
              </p>
              <h2 className="text-5xl font-bold text-primary">
                {t("bage_16")}
              </h2>
            </div>
            <div className="my-6 md:my-12">
              {isMobile && (
                <img
                  src="./images/our_univers-3.webp"
                  alt="feature new"
                  className="h-full object-cover"
                />
              )}
              <h3 className="text-xl font-medium">{t("des_bag_1")}</h3>
              <p className="text-base my-6 italic">{t("des_bag_2")}</p>
              <p className="text-base my-6 italic">{t("des_bag_3")}</p>
              <p className="text-base my-6 italic">{t("des_bag_4")}</p>
              <p className="text-base my-6 italic">{t("des_bag_5")}</p>
            </div>
          </div>
        </Col>
        {!isMobile && (
          <Col span={24} md={8} className={``}>
            <img
              src="./images/our_univers-3.webp"
              alt="feature new"
              className="w-full h-full object-contain"
            />
          </Col>
        )}
      </Row>
    </div>
  );
}
