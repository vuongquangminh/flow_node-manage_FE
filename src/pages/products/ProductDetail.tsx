import { useParams } from "react-router-dom";
import { useGetProductDetailQuery } from "../../store/services/ProductService";
import { Col, Row, Spin } from "antd";
import Header from "../../components/Layout/Header";
import Slider from "react-slick";
import { useEffect, useRef, useState } from "react";

export default function ProductDetail() {
  const { id } = useParams();
  const { data, isLoading } = useGetProductDetailQuery({ id: String(id) });
  const [imageSideBar, setImageSideBar] = useState<string[]>(
    () => data?.data?.color[0].image_color || []
  );
  const sliderRef = useRef<Slider>(null);

  useEffect(() => {
    setImageSideBar(data?.data?.color[0].image_color || []);
  }, [data]);
  const handleThumbnailClick = (index: number) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
    }
  };
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
      <div className="container mx-auto mt-24 py-6">
        {isLoading ? (
          <Spin fullscreen={true} />
        ) : (
          <>
            <Row className="!mx-0">
              <Col sm={24} md={16}>
                <Row gutter={24} className="!mx-0">
                  <Col span={4}>
                    {imageSideBar.map((item, index) => (
                      <div
                        className="!flex justify-center"
                        key={index}
                        onClick={() => handleThumbnailClick(index)}
                      >
                        <img src={item} />
                      </div>
                    ))}
                  </Col>
                  <Col span={20}>
                    <Slider ref={sliderRef}>
                      {imageSideBar.map((item) => (
                        <div className="!flex justify-center ">
                          <img src={item} />
                        </div>
                      ))}
                    </Slider>
                  </Col>
                </Row>
              </Col>
              <Col span={8}></Col>
            </Row>
          </>
        )}
      </div>
    </>
  );
}
