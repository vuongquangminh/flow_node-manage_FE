import { ArrowRight } from "lucide-react";
import Slider from "react-slick";
import { slick_settings } from "../../constants";

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
      <Slider {...slick_settings}>
        {items.map((item) => (
          <div key={item.id} className="relative overflow-hidden px-2">
            <div className="w-full">
              <img className="w-full" src={item.image} alt="" />
            </div>

            <div className="absolute px-6 py-4 w-full bottom-0 max-w-[800px] text-white flex justify-between items-center">
              <h2 className="text-sm sm:text-2xl font-bold font-fantasy">
                {item.title}
              </h2>
              <div className=" text-primary rounded-none text-lg border-inherit border p-3 hover:bg-gray-100 cursor-pointer">
                <ArrowRight size={24} />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
