import Slider from "react-slick";
import CardProduct from "./CardProduct";
import { ProductRes } from "../type/api";
import { slick_settings } from "../constants";

function SlickImage({ products }: { products?: ProductRes[] }) {
  return (
    <div className="slider-container overflow-hidden">
      <Slider {...slick_settings}>
        {products?.map((product) => (
          <div className="px-2">
            <CardProduct product={product} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default SlickImage;
