import { Col, Row } from "antd";
import { useEffect, useState } from "react";

export default function MostProminent() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth <= 650);

    checkWidth(); // Gọi lần đầu

    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);
  return (
    <div className="container mx-auto py-20">
      <Row gutter={32} className="px-16 md:px-0">
        <Col span={24} md={16} className="px-20">
          <div className="md:pr-30">
            <div className="">
              <p className="uppercase tracking-[3px] text-sm text-[#504584]">
                bage
              </p>
              <h2 className="text-5xl font-bold text-primary">
                Changing bags16
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
              <h3 className="text-xl font-medium">
                ✨ "Elevate Your Style – Discover the Perfect Handbag!" ✨
              </h3>
              <p className="text-base my-6 italic">
                Because being parents is an adventure like no other. Our first
                baby bag adapts to every situation. Keep bottles cool in the
                insulated pocket, attach to the pushchair, open with one hand in
                less than a second, and store everything so you can find it
                again
              </p>
              <p className="text-base my-6 italic">
                Sleek design, premium finish, and just the right size to hold
                everything you need without compromising style.
              </p>
              <p className="text-base my-6 italic">
                Our handbag blends timeless fashion with everyday function, so
                you never have to choose between beauty and practicality.
              </p>
              <p className="text-base my-6 italic">
                Whether you’re conquering the office or strolling through the
                city, this bag keeps up with your lifestyle effortlessly.
              </p>
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
