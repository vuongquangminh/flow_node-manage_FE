import { ArrowRight } from "lucide-react";
import Slider from "react-slick";
import { slick_settings } from "../../constants";
import CardOurCategory from "../../components/CardOurCategory";

export default function OurUnivers() {
  const items = [
    {
      id: 1,
      image: "./images/our_univers-1.webp",
      title: "Backpacks",
    },
    {
      id: 2,
      image: "./images/our_univers-2.webp",
      title: "Crossbody Adventurer",
    },
    {
      id: 3,
      image: "./images/our_univers-3.webp",
      title: "Changing bags",
    },
    {
      id: 4,
      image: "./images/our_univers-4.webp",
      title: "Nano Adventurer",
    },
    {
      id: 5,
      image: "./images/our_univers-5.webp",
      title: "Duffle Explorer",
    },
    {
      id: 6,
      image: "./images/our_univers-6.webp",
      title: "Tote bags",
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
