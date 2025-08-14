import Slider from "react-slick";
import { slick_settings } from "../../constants";
import CardOurCategory from "../../components/CardOurCategory";
import { useTranslation } from "react-i18next";

export default function OurUnivers() {
  const {t} = useTranslation();
  const items = [
    {
      id: 1,
      image: "./images/our_univers-1.webp",
      title: t("our_univers_1"),
    },
    {
      id: 2,
      image: "./images/our_univers-2.webp",
      title: t("our_univers_2"),
    },
    {
      id: 3,
      image: "./images/our_univers-3.webp",
      title: t("our_univers_3"),
    },
    {
      id: 4,
      image: "./images/our_univers-4.webp",
      title: t("our_univers_4"),
    },
    {
      id: 5,
      image: "./images/our_univers-5.webp",
      title: t("our_univers_5"),
    },
    {
      id: 6,
      image: "./images/our_univers-6.webp",
      title: t("our_univers_6"),
    },
  ];
  return (
    <div className="overflow-hidden">
      <Slider {...slick_settings} slidesToShow={4}>
        {items.map((item) => (
          <CardOurCategory key={item.id} item={item} />
        ))}
      </Slider>
    </div>
  );
}
