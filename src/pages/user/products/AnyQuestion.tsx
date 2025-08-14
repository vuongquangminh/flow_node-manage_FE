import { Col, Collapse, CollapseProps, Row } from "antd";

export default function AnyQuestion() {
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: (
        <p className="text-lg font-semibold text-[#312f2f]">
          What can I fit inside?
        </p>
      ),
      children: (
        <div className="tracking-[0.5px] text-sm">
          <p>
            This size is perfect for a 3 to 5-day trip — whether it’s a city
            break, a beach getaway, or a short business trip. It gives you
            enough room to pack smartly without overloading. A well-packed 48 L
            bag typically holds:
          </p>
          <li>4 tops and 2–3 bottoms</li>
          <li>1 lightweight jacket or cardigan</li>
          <li>1 or 2 pairs of shoes (one worn, one packed)</li>
          <li>Underwear and sleepwear for several days</li>
          <li>A toiletry bag</li>
          <li>Travel essentials (passport, wallet, water bottle)</li>
          <li>
            Optional extras like a bottle of water, book, sunglasses, or a
            packable backpack
          </li>
          <li>Tech accessories (chargers, power bank, headphones)</li>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <p className="text-lg font-semibold text-[#312f2f]">
          Is the bag compatible with our interchangeable pockets?
        </p>
      ),
      children: (
        <p className="tracking-[0.5px] text-sm">
          Yes, it comes with the MOLLE system on the front to attach our medium
          front pockets.
        </p>
      ),
    },
    {
      key: "3",
      label: (
        <p className="text-lg font-semibold text-[#312f2f]">
          Why is the Duffle Explorer ideal for travel?
        </p>
      ),
      children: (
        <p className="tracking-[0.5px] text-sm">
          The Duffle Explorer is designed to go wherever you do. It features a
          spacious main compartment with a 200° opening, a separate shoe pocket,
          and a 45° angled bottle holder to keep your bottle in place no matter
          the bag’s position. Multiple easy-access exterior pockets make
          organization a breeze. It also comes with two large magnetic handles
          and two side handles so you can carry it any way you like. Hidden
          shoulder straps let you wear it as a backpack, and a padded laptop
          compartment keeps your tech safe. Perfect for weekends away or long
          trips.
        </p>
      ),
    },
    {
      key: "4",
      label: (
        <p className="text-lg font-semibold text-[#312f2f]">
          Is this bag cabin-size approved for airlines?
        </p>
      ),
      children: (
        <p className="tracking-[0.5px] text-sm">
          No, the Duffle Explorer does not meet standard cabin baggage size
          requirements and must be checked in when flying.
        </p>
      ),
    },
  ];
  return (
    <div className="container mx-auto py-20">
      <Row gutter={32} className=" px-0 md:px-16 !mx-0">
        <Col span={24} md={12} className="px-20">
          <img
            src="/images/any-question.webp"
            alt="feature new"
            className="w-full h-full object-contain"
          />
        </Col>

        <Col span={24} md={12}>
          <p className="text-primary text-2xl uppercase font-bold max-w-80 md:max-w-full">
            Any questions ?
          </p>
          <Collapse defaultActiveKey={["1"]} ghost accordion items={items} />
        </Col>
      </Row>
    </div>
  );
}
