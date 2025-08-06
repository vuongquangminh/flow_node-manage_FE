import { Button, Carousel } from "antd";
import Header from "../components/Layout/Header";
import CardProduct from "../components/CardProduct";

export default function Homepage() {
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
      <div className="relative">
        <Carousel className="w-full">
          <div>
            <img src="./images/banner1.webp" alt="" />
          </div>
          <div>
            <img src="./images/banner2.webp" alt="" />
          </div>
          <div>
            <img src="./images/banner3.webp" alt="" />
          </div>
        </Carousel>
        <div className="absolute p-8 md:pl-16 top-3/4 transform -translate-y-3/4 max-w-[800px] text-white">
          <h2 className="text-sm sm:text-4xl md:text-6xl font-bold font-fantasy">
            Crossbody
          </h2>
          <p className="mt-4 max-w-xl">
            Now in sizes Small and Large, more freedom to be truly yourself
          </p>
          <Button className="mt-4 mr-4 text-primary rounded-none text-lg px-8 py-6 border-primary">
            Discover
          </Button>
          <Button className="mt-4 text-primary rounded-none text-lg px-8 py-6 border-primary">
            Know more
          </Button>
        </div>
      </div>
      <CardProduct />
    </>
  );
}
